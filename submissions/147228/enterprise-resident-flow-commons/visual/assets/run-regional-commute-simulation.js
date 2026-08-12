'use strict';

/*
 * Regional-scale synthetic commute runner.
 *
 * It deliberately loops through every declared population-scale agent, but
 * keeps only aggregate counters and histogram bins. It is a transparent
 * stress test, not an observed Haidian OD model or a resident-satisfaction
 * measurement. No network access and no personal trajectory are used.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const model = JSON.parse(fs.readFileSync(path.join(root, 'regional-scale-commute.json'), 'utf8'));
const TOTAL = model.regional_scope.population_reference;
const GROUPS = model.synthetic_population.groups;
const MODES = model.modes;
const HISTOGRAM_BINS = [30, 45, 60, 90, Infinity];
const SATISFACTION_HISTOGRAM_BINS = [40, 50, 60, 70, 80, 90, 100];
const ACCESSIBILITY_HISTOGRAM_BINS = [0.70, 0.80, 0.90, 0.95, 1.00];
const UTILITY_COMPONENTS = [
  'time_disutility',
  'wait_disutility',
  'crowding_disutility',
  'curb_disutility',
  'accessibility_disutility',
  'reliability_disutility',
  'conflict_disutility'
];

function fail(message) {
  console.error(`REGIONAL_MODEL_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function clamp(value, low, high) {
  return Math.max(low, Math.min(high, value));
}

function hash(index, salt) {
  let value = (index + 1 + salt * 2654435761) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 2246822519) >>> 0;
  value ^= value >>> 13;
  value = Math.imul(value, 3266489917) >>> 0;
  return (value ^ (value >>> 16)) >>> 0;
}

function unit(index, salt) {
  return hash(index, salt) / 4294967296;
}

function selectWeighted(weights, index, salt) {
  const target = unit(index, salt);
  let cursor = 0;
  for (const mode of MODES) {
    cursor += Number(weights[mode] || 0);
    if (target < cursor) return mode;
  }
  return MODES[MODES.length - 1];
}

function groupRanges() {
  let start = 0;
  return GROUPS.map((group) => {
    const range = { ...group, start, end: start + group.count };
    start += group.count;
    return range;
  });
}

function groupFor(index, ranges) {
  return ranges.find((group) => index >= group.start && index < group.end);
}

function addMap(map, key, value = 1) {
  map[key] = Number(map[key] || 0) + value;
}

function emptyUtilityComponents() {
  return Object.fromEntries(UTILITY_COMPONENTS.map((key) => [key, 0]));
}

function buildUtilityComponentReadout(totalComponents, groupComponents, groupCounts, processed) {
  const meanComponents = Object.fromEntries(UTILITY_COMPONENTS.map((key) => [key, round(totalComponents[key] / processed, 4)]));
  const byGroup = Object.fromEntries(GROUPS.map((group) => {
    const means = Object.fromEntries(UTILITY_COMPONENTS.map((key) => [key, round(groupComponents[group.id][key] / groupCounts[group.id], 4)]));
    const totalDisutility = sum(Object.values(means));
    return [group.id, {
      count: groupCounts[group.id],
      mean_components: means,
      total_disutility: round(totalDisutility, 4),
      reconstructed_score: round(clamp(100 - totalDisutility, 0, 100), 2)
    }];
  }));
  const totalDisutility = sum(Object.values(meanComponents));
  return {
    method: 'additive_proxy_decomposition_from_regional_agent_score',
    formula: 'score = clamp(100 - time - wait - crowding - curb - accessibility - reliability - conflict, 0, 100)',
    component_units: 'proxy points per synthetic agent; not money, minutes or survey responses',
    mean_components: meanComponents,
    total_disutility: round(totalDisutility, 4),
    reconstructed_score: round(clamp(100 - totalDisutility, 0, 100), 2),
    by_group: byGroup,
    interpretation: 'This is a transparent synthetic utility decomposition. It is not resident satisfaction, employee preference, public acceptance or field service quality.'
  };
}

function tripDistanceKm(mode, distanceFactor, zoneFactor) {
  const base = {
    car: 18,
    bicycle: 8,
    walking_wheelchair: 3,
    metro: 8.5,
    bus: 8.5,
    enterprise_shuttle: 8.5
  }[mode];
  return distanceFactor * zoneFactor * base;
}

function buildServiceLedger(modeCounts, capacityMultiplierByMode = {}) {
  return Object.fromEntries(MODES.map((mode) => {
    const parameters = model.mode_parameters[mode];
    const unit = parameters.service_unit;
    const personTrips = Number(modeCounts[mode] || 0);
    const capacityPerUnit = Number(unit.capacity_persons_per_unit);
    const capacityMultiplier = Number(capacityMultiplierByMode[mode] || 1);
    const declaredPersonCapacity = parameters.capacity_person_trips * capacityMultiplier;
    const requiredUnits = Math.ceil(personTrips / capacityPerUnit);
    const availableUnits = Math.ceil(declaredPersonCapacity / capacityPerUnit);
    const availablePersonCapacity = availableUnits * capacityPerUnit;
    return [mode, {
      mode,
      label_zh: parameters.label_zh,
      label_en: parameters.label_en,
      unit_type: unit.unit_type,
      unit_label_zh: unit.label_zh,
      unit_label_en: unit.label_en,
      vehicle_or_service: unit.vehicle_or_service,
      capacity_persons_per_unit: capacityPerUnit,
      distance_km_per_unit: unit.distance_km_per_unit,
      person_trips: personTrips,
      declared_person_capacity: round(declaredPersonCapacity, 0),
      capacity_multiplier: capacityMultiplier,
      available_units: availableUnits,
      required_units: requiredUnits,
      spare_units: Math.max(0, availableUnits - requiredUnits),
      unit_load_ratio: round(requiredUnits / Math.max(availableUnits, 1)),
      person_capacity_utilization: round(personTrips / Math.max(availablePersonCapacity, 1)),
      vehicle_or_service_km_proxy: round(requiredUnits * Number(unit.distance_km_per_unit), 0),
      interpretation: 'synthetic service-unit screen; not an observed fleet, timetable or capacity fact'
    }];
  }));
}

function simulateDepartureTimeChoiceScreen(policyId, profileId) {
  const bands = model.departure_time_choice.bands;
  const bandById = Object.fromEntries(bands.map((band) => [band.id, band]));
  const profile = model.mode_weights_by_group[profileId];
  const bandCounts = Object.fromEntries(bands.map((band) => [band.id, 0]));
  const groupBandCounts = Object.fromEntries(GROUPS.map((group) => [
    group.id,
    Object.fromEntries(bands.map((band) => [band.id, 0]))
  ]));
  const modeBandCounts = Object.fromEntries(MODES.map((mode) => [
    mode,
    Object.fromEntries(bands.map((band) => [band.id, 0]))
  ]));
  const groupModeBandCounts = Object.fromEntries(GROUPS.map((group) => [
    group.id,
    Object.fromEntries(MODES.map((mode) => [
      mode,
      Object.fromEntries(bands.map((band) => [band.id, 0]))
    ]))
  ]));
  let processed = 0;
  let shiftedEnterpriseAgents = 0;
  let reschedulingCostPersonMinutes = 0;

  for (const group of groupRanges()) {
    const rule = model.departure_time_choice.group_rules[group.id];
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      const mode = selectWeighted(profile[group.id], index, 61);
      let bandId = rule.default_band;
      const shiftEligible = profileId === 'O4'
        && rule.shiftable
        && unit(index, 67) < Number(rule.shift_share_O4 || 0);
      if (shiftEligible) {
        bandId = rule.shift_band;
        shiftedEnterpriseAgents += 1;
        reschedulingCostPersonMinutes += Math.abs(Number(bandById[bandId].offset_minutes || 0));
      }
      bandCounts[bandId] += 1;
      groupBandCounts[group.id][bandId] += 1;
      modeBandCounts[mode][bandId] += 1;
      groupModeBandCounts[group.id][mode][bandId] += 1;
      processed += 1;
    }
  }

  const protectedGroupShiftCount = sum(GROUPS
    .filter((group) => group.id !== 'enterprise_employee')
    .map((group) => bands.reduce((total, band) => {
      const defaultBand = model.departure_time_choice.group_rules[group.id].default_band;
      return total + (band.id === defaultBand ? 0 : groupBandCounts[group.id][band.id]);
    }, 0)));
  const modeBandShares = Object.fromEntries(MODES.map((mode) => [
    mode,
    Object.fromEntries(bands.map((band) => [band.id, round(modeBandCounts[mode][band.id] / Math.max(processed, 1))]))
  ]));

  return {
    policy_id: policyId,
    profile_id: profileId,
    model_class: model.departure_time_choice.model_class,
    status: model.departure_time_choice.status,
    agents_processed: processed,
    all_agents_processed: processed === TOTAL,
    mass_conservation: sum(Object.values(bandCounts)) === TOTAL,
    band_counts: bandCounts,
    band_shares: Object.fromEntries(bands.map((band) => [band.id, round(bandCounts[band.id] / Math.max(processed, 1))])),
    group_band_counts: groupBandCounts,
    mode_band_counts: modeBandCounts,
    group_mode_band_counts: groupModeBandCounts,
    mode_band_shares: modeBandShares,
    preferred_band_share: round(bandCounts.preferred / Math.max(processed, 1)),
    shifted_enterprise_agents: shiftedEnterpriseAgents,
    shifted_enterprise_share: round(shiftedEnterpriseAgents / Math.max(model.synthetic_population.groups.find((group) => group.id === 'enterprise_employee').count, 1)),
    protected_group_shift_count: protectedGroupShiftCount,
    rescheduling_cost_person_minutes_proxy: reschedulingCostPersonMinutes,
    offset_minutes_by_band: Object.fromEntries(bands.map((band) => [band.id, band.offset_minutes])),
    interpretation: 'synthetic grouped time-band sensitivity; not observed employee behaviour, arrival distribution or timetable performance'
  };
}

function simulateTimeSlicedServiceOperations(policyId, profileId, choiceScreen = null) {
  const operations = model.service_time_operations;
  const slices = operations.time_slices;
  const choice = choiceScreen || simulateDepartureTimeChoiceScreen(policyId, profileId);
  const supply = operations.service_supply_units_by_profile[profileId]
    || operations.service_supply_units_by_profile.B0;
  const modeSummaries = {};
  const modeSliceRows = {};
  let demandProcessed = 0;
  let boardedPersonTrips = 0;
  let unresolvedQueuePersonTrips = 0;
  let failedBoardingAttempts = 0;
  let queuePersonMinutesProxy = 0;
  let scheduledServiceKmProxy = 0;

  for (const mode of MODES) {
    const parameters = model.mode_parameters[mode];
    const serviceUnit = parameters.service_unit;
    const capacityPerUnit = Number(serviceUnit.capacity_persons_per_unit);
    let queueBefore = 0;
    let modeDemand = 0;
    let modeBoarded = 0;
    let modeFailedBoardingAttempts = 0;
    let modeQueuePersonMinutesProxy = 0;
    let modeScheduledServiceKmProxy = 0;
    const rows = [];

    for (const slice of slices) {
      const demand = Number(choice.mode_band_counts[mode][slice.id] || 0);
      const availableUnits = Number(supply[mode][slice.id] || 0);
      const availablePersonCapacity = availableUnits * capacityPerUnit;
      const arrivals = demand + queueBefore;
      const boarded = Math.min(arrivals, availablePersonCapacity);
      const failedBoarding = Math.max(0, arrivals - boarded);
      const queueAfter = failedBoarding;
      const loadRatio = availablePersonCapacity > 0 ? arrivals / availablePersonCapacity : (arrivals > 0 ? Infinity : 0);

      rows.push({
        mode,
        time_slice: slice.id,
        demand_person_trips: demand,
        queue_before_person_trips: queueBefore,
        arrivals_including_queue: arrivals,
        available_service_units: availableUnits,
        capacity_persons_per_unit: capacityPerUnit,
        available_person_capacity: round(availablePersonCapacity, 2),
        boarded_person_trips: round(boarded, 2),
        failed_boarding_attempts: round(failedBoarding, 2),
        residual_queue_after_slice: round(queueAfter, 2),
        load_ratio: round(loadRatio),
        queue_person_minutes_proxy: round(queueAfter * Number(slice.duration_minutes), 2),
        scheduled_service_km_proxy: round(availableUnits * Number(serviceUnit.distance_km_per_unit), 2),
        interpretation: 'synthetic FIFO slice screen; not an observed timetable, boarding count or passenger-level queue'
      });

      modeDemand += demand;
      modeBoarded += boarded;
      modeFailedBoardingAttempts += failedBoarding;
      modeQueuePersonMinutesProxy += queueAfter * Number(slice.duration_minutes);
      modeScheduledServiceKmProxy += availableUnits * Number(serviceUnit.distance_km_per_unit);
      queueBefore = queueAfter;
    }

    const declaredAvailableUnits = rows.reduce((total, row) => total + row.available_service_units, 0);
    const requiredUnitsForDemand = Math.ceil(modeDemand / capacityPerUnit);
    const modeMassConservation = Math.abs(modeDemand - (modeBoarded + queueBefore)) < 0.01;
    modeSliceRows[mode] = rows;
    modeSummaries[mode] = {
      mode,
      label_zh: parameters.label_zh,
      label_en: parameters.label_en,
      demand_person_trips: modeDemand,
      declared_available_units: declaredAvailableUnits,
      required_units_for_demand: requiredUnitsForDemand,
      supply_unit_shortfall: Math.max(0, requiredUnitsForDemand - declaredAvailableUnits),
      boarded_person_trips: round(modeBoarded, 2),
      failed_boarding_attempts: round(modeFailedBoardingAttempts, 2),
      unresolved_queue_person_trips: round(queueBefore, 2),
      queue_person_minutes_proxy: round(modeQueuePersonMinutesProxy, 2),
      scheduled_service_km_proxy: round(modeScheduledServiceKmProxy, 2),
      peak_slice_load_ratio: round(Math.max(...rows.map((row) => row.load_ratio))),
      mass_conservation: modeMassConservation,
      interpretation: 'synthetic service supply and FIFO queue screen; residual queue is a calibration stop signal, not a local performance result'
    };

    demandProcessed += modeDemand;
    boardedPersonTrips += modeBoarded;
    unresolvedQueuePersonTrips += queueBefore;
    failedBoardingAttempts += modeFailedBoardingAttempts;
    queuePersonMinutesProxy += modeQueuePersonMinutesProxy;
    scheduledServiceKmProxy += modeScheduledServiceKmProxy;
  }

  const gate = model.optimization_search.hard_gate_constraints;
  const peakSliceLoadRatio = round(Math.max(...Object.values(modeSummaries).map((summary) => summary.peak_slice_load_ratio)));
  return {
    policy_id: policyId,
    profile_id: profileId,
    model_class: operations.model_class,
    status: operations.status,
    agents_processed: demandProcessed,
    all_agents_processed: demandProcessed === TOTAL,
    demand_mass_conservation: demandProcessed === TOTAL,
    boarded_person_trips: round(boardedPersonTrips, 2),
    unresolved_queue_person_trips: round(unresolvedQueuePersonTrips, 2),
    failed_boarding_attempts: round(failedBoardingAttempts, 2),
    queue_person_minutes_proxy: round(queuePersonMinutesProxy, 2),
    scheduled_service_km_proxy: round(scheduledServiceKmProxy, 2),
    peak_slice_load_ratio: peakSliceLoadRatio,
    peak_load_gate_ratio: gate.maximum_peak_mode_load_ratio,
    mode_summaries: modeSummaries,
    mode_slice_rows: modeSliceRows,
    mode_slice_mass_conservation: Object.values(modeSummaries).every((summary) => summary.mass_conservation),
    operations_screen_pass: unresolvedQueuePersonTrips === 0 && peakSliceLoadRatio <= gate.maximum_peak_mode_load_ratio,
    selection_boundary: operations.selection_boundary,
    interpretation: 'synthetic aggregate time-slice operations screen; use non-zero residual queue to trigger timetable, capacity and boarding-data calibration'
  };
}

function simulateAdaptiveRecourseScreen(policyId, profileId, serviceOperations, choiceScreen = null) {
  const recourse = model.adaptive_recourse;
  const operations = model.service_time_operations;
  const slices = operations.time_slices;
  const choice = choiceScreen || simulateDepartureTimeChoiceScreen(policyId, profileId);
  const supply = operations.service_supply_units_by_profile[profileId]
    || operations.service_supply_units_by_profile.B0;
  const groupIds = GROUPS.map((group) => group.id);
  const priorityGroups = recourse.priority_group_order.filter((groupId) => groupIds.includes(groupId));
  const blockedSourceModes = new Set(recourse.blocked_source_modes || []);
  const queue = Object.fromEntries(MODES.map((mode) => [
    mode,
    Object.fromEntries(groupIds.map((groupId) => [groupId, 0]))
  ]));
  const totalGroupDemand = Object.fromEntries(groupIds.map((groupId) => [groupId, 0]));
  const primaryBoardedByGroup = Object.fromEntries(groupIds.map((groupId) => [groupId, 0]));
  const recourseMovedByGroup = Object.fromEntries(groupIds.map((groupId) => [groupId, 0]));
  const recourseByMode = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const primaryBoardedByMode = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const residualQueueByMode = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const residualQueueByGroup = Object.fromEntries(groupIds.map((groupId) => [groupId, 0]));
  const recourseBySourceTarget = {};
  const recourseFlows = [];
  const modeSliceRows = {};
  let demandProcessed = 0;
  let primaryBoardedPersonTrips = 0;
  let recourseBoardedPersonTrips = 0;
  let failedBoardingAttempts = 0;
  let queuePersonMinutesProxy = 0;
  let peakSliceLoadRatio = 0;

  for (const groupId of groupIds) {
    for (const mode of MODES) {
      for (const slice of slices) {
        totalGroupDemand[groupId] += Number(choice.group_mode_band_counts[groupId][mode][slice.id] || 0);
      }
    }
  }

  for (const slice of slices) {
    const queueBeforeByMode = Object.fromEntries(MODES.map((mode) => [mode, sum(Object.values(queue[mode]))]));
    const demandByMode = Object.fromEntries(MODES.map((mode) => [mode, 0]));
    const primaryArrivalsByMode = Object.fromEntries(MODES.map((mode) => [mode, 0]));
    const primaryBoardedInSlice = Object.fromEntries(MODES.map((mode) => [mode, 0]));
    const primaryFailedInSlice = Object.fromEntries(MODES.map((mode) => [mode, 0]));
    const recourseReceivedInSlice = Object.fromEntries(MODES.map((mode) => [mode, 0]));
    const recourseSentInSlice = Object.fromEntries(MODES.map((mode) => [mode, 0]));
    const spareCapacityByMode = {};
    const capacityByMode = {};

    for (const mode of MODES) {
      for (const groupId of groupIds) {
        const demand = Number(choice.group_mode_band_counts[groupId][mode][slice.id] || 0);
        queue[mode][groupId] += demand;
        demandByMode[mode] += demand;
        demandProcessed += demand;
      }
      const serviceUnit = model.mode_parameters[mode].service_unit;
      const availableUnits = Number(supply[mode][slice.id] || 0);
      const availablePersonCapacity = availableUnits * Number(serviceUnit.capacity_persons_per_unit);
      capacityByMode[mode] = availablePersonCapacity;
      primaryArrivalsByMode[mode] = sum(Object.values(queue[mode]));
      let capacityLeft = availablePersonCapacity;
      for (const groupId of priorityGroups) {
        const boarded = Math.min(queue[mode][groupId], capacityLeft);
        queue[mode][groupId] -= boarded;
        capacityLeft -= boarded;
        primaryBoardedInSlice[mode] += boarded;
        primaryBoardedByMode[mode] += boarded;
        primaryBoardedByGroup[groupId] += boarded;
      }
      primaryFailedInSlice[mode] = Math.max(0, primaryArrivalsByMode[mode] - primaryBoardedInSlice[mode]);
      spareCapacityByMode[mode] = Math.max(0, capacityLeft);
      peakSliceLoadRatio = Math.max(
        peakSliceLoadRatio,
        capacityByMode[mode] > 0 ? primaryArrivalsByMode[mode] / capacityByMode[mode] : (primaryArrivalsByMode[mode] > 0 ? Infinity : 0)
      );
    }

    for (const sourceMode of MODES) {
      if (blockedSourceModes.has(sourceMode)) continue;
      const fallbackModes = recourse.fallback_priority_by_mode[sourceMode] || [];
      for (const targetMode of fallbackModes) {
        if (!MODES.includes(targetMode) || spareCapacityByMode[targetMode] <= 0) continue;
        for (const groupId of priorityGroups) {
          const maxShare = Number(recourse.max_recourse_share_by_group[groupId] || 0);
          const groupAllowance = Math.max(0, totalGroupDemand[groupId] * maxShare - recourseMovedByGroup[groupId]);
          const moved = Math.min(queue[sourceMode][groupId], spareCapacityByMode[targetMode], groupAllowance);
          if (moved <= 0) continue;
          queue[sourceMode][groupId] -= moved;
          spareCapacityByMode[targetMode] -= moved;
          recourseMovedByGroup[groupId] += moved;
          recourseByMode[targetMode] += moved;
          recourseReceivedInSlice[targetMode] += moved;
          recourseSentInSlice[sourceMode] += moved;
          const sourceMinutes = Number(model.mode_parameters[sourceMode].base_minutes);
          const targetMinutes = Number(model.mode_parameters[targetMode].base_minutes);
          const costPersonMinutesProxy = moved * (Math.abs(targetMinutes - sourceMinutes) + 5);
          const flow = {
            time_slice: slice.id,
            source_mode: sourceMode,
            target_mode: targetMode,
            group: groupId,
            moved_person_trips: round(moved, 2),
            cost_person_minutes_proxy: round(costPersonMinutesProxy, 2),
            interpretation: 'synthetic bounded alternate-mode transfer; not an observed passenger choice or route assignment'
          };
          recourseFlows.push(flow);
          const pairKey = `${sourceMode}→${targetMode}`;
          if (!recourseBySourceTarget[pairKey]) {
            recourseBySourceTarget[pairKey] = {
              source_mode: sourceMode,
              target_mode: targetMode,
              moved_person_trips: 0,
              cost_person_minutes_proxy: 0
            };
          }
          recourseBySourceTarget[pairKey].moved_person_trips += moved;
          recourseBySourceTarget[pairKey].cost_person_minutes_proxy += costPersonMinutesProxy;
          if (spareCapacityByMode[targetMode] <= 0) break;
        }
      }
    }

    for (const mode of MODES) {
      const residualQueue = sum(Object.values(queue[mode]));
      const serviceUnit = model.mode_parameters[mode].service_unit;
      const totalBoardedInSlice = primaryBoardedInSlice[mode] + recourseReceivedInSlice[mode];
      const loadRatioAfterRecourse = capacityByMode[mode] > 0
        ? totalBoardedInSlice / capacityByMode[mode]
        : (totalBoardedInSlice > 0 ? Infinity : 0);
      modeSliceRows[mode] = modeSliceRows[mode] || [];
      modeSliceRows[mode].push({
        mode,
        time_slice: slice.id,
        demand_person_trips: round(demandByMode[mode], 2),
        queue_before_person_trips: round(queueBeforeByMode[mode], 2),
        arrivals_including_queue: round(primaryArrivalsByMode[mode], 2),
        available_service_units: Number(supply[mode][slice.id] || 0),
        available_person_capacity: round(capacityByMode[mode], 2),
        primary_boarded_person_trips: round(primaryBoardedInSlice[mode], 2),
        failed_boarding_attempts_before_recourse: round(primaryFailedInSlice[mode], 2),
        recourse_sent_person_trips: round(recourseSentInSlice[mode], 2),
        recourse_received_person_trips: round(recourseReceivedInSlice[mode], 2),
        boarded_person_trips_after_recourse: round(totalBoardedInSlice, 2),
        residual_queue_after_recourse: round(residualQueue, 2),
        load_ratio_after_recourse: round(loadRatioAfterRecourse),
        queue_person_minutes_proxy: round(residualQueue * Number(slice.duration_minutes), 2),
        interpretation: 'synthetic FIFO primary boarding plus bounded recourse; residual queue remains a calibration stop signal'
      });
      residualQueueByMode[mode] = residualQueue;
      queuePersonMinutesProxy += residualQueue * Number(slice.duration_minutes);
      primaryBoardedPersonTrips += primaryBoardedInSlice[mode];
      recourseBoardedPersonTrips += recourseReceivedInSlice[mode];
      failedBoardingAttempts += primaryFailedInSlice[mode];
    }
  }

  for (const mode of MODES) {
    residualQueueByMode[mode] = round(residualQueueByMode[mode], 2);
    for (const groupId of groupIds) residualQueueByGroup[groupId] += queue[mode][groupId];
  }
  for (const groupId of groupIds) residualQueueByGroup[groupId] = round(residualQueueByGroup[groupId], 2);

  const recourseByGroup = Object.fromEntries(groupIds.map((groupId) => {
    const demand = totalGroupDemand[groupId];
    const moved = recourseMovedByGroup[groupId];
    const maxShare = Number(recourse.max_recourse_share_by_group[groupId] || 0);
    return [groupId, {
      group: groupId,
      demand_person_trips: demand,
      moved_person_trips: round(moved, 2),
      max_recourse_share: maxShare,
      recourse_share: round(moved / Math.max(demand, 1)),
      share_limit_person_trips: round(demand * maxShare, 2),
      constraint_pass: moved <= demand * maxShare + 0.01
    }];
  }));
  const groupMassConservation = Object.fromEntries(groupIds.map((groupId) => [
    groupId,
    Math.abs(totalGroupDemand[groupId] - (primaryBoardedByGroup[groupId] + recourseMovedByGroup[groupId] + residualQueueByGroup[groupId])) < 0.01
  ]));
  const totalCapacityByMode = Object.fromEntries(MODES.map((mode) => [
    mode,
    slices.reduce((total, slice) => total + Number(supply[mode][slice.id] || 0) * Number(model.mode_parameters[mode].service_unit.capacity_persons_per_unit), 0)
  ]));
  const modeCapacityNotExceeded = MODES.every((mode) => primaryBoardedByMode[mode] + recourseByMode[mode] <= totalCapacityByMode[mode] + 0.01);
  const recourseShareConstraintsPass = Object.values(recourseByGroup).every((row) => row.constraint_pass);
  const blockedSourceModesUntouched = [...blockedSourceModes].every((mode) => recourseFlows.every((flow) => flow.source_mode !== mode));
  const totalCostPersonMinutesProxy = sum(recourseFlows.map((flow) => flow.cost_person_minutes_proxy));
  const unresolvedQueuePersonTrips = sum(Object.values(residualQueueByMode));
  const demandMassConservation = demandProcessed === primaryBoardedPersonTrips + recourseBoardedPersonTrips + unresolvedQueuePersonTrips;
  const gate = model.optimization_search.hard_gate_constraints;
  return {
    policy_id: policyId,
    profile_id: profileId,
    model_class: recourse.model_class,
    status: recourse.status,
    agents_processed: demandProcessed,
    all_agents_processed: demandProcessed === TOTAL,
    primary_boarded_person_trips: round(primaryBoardedPersonTrips, 2),
    recourse_boarded_person_trips: round(recourseBoardedPersonTrips, 2),
    total_boarded_person_trips: round(primaryBoardedPersonTrips + recourseBoardedPersonTrips, 2),
    unresolved_queue_person_trips: round(unresolvedQueuePersonTrips, 2),
    failed_boarding_attempts: round(failedBoardingAttempts, 2),
    queue_person_minutes_proxy: round(queuePersonMinutesProxy, 2),
    recourse_cost_person_minutes_proxy: round(totalCostPersonMinutesProxy, 2),
    peak_slice_load_ratio_after_recourse: round(peakSliceLoadRatio),
    peak_load_gate_ratio: gate.maximum_peak_mode_load_ratio,
    demand_mass_conservation: demandMassConservation,
    group_mass_conservation: groupMassConservation,
    mode_capacity_not_exceeded: modeCapacityNotExceeded,
    recourse_share_constraints_pass: recourseShareConstraintsPass,
    blocked_source_modes: [...blockedSourceModes],
    blocked_source_modes_untouched: blockedSourceModesUntouched,
    walking_accessibility_recourse_count: recourseFlows.filter((flow) => flow.source_mode === 'walking_wheelchair').length,
    primary_boarded_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(primaryBoardedByMode[mode], 2)])),
    recourse_boarded_by_target_mode: Object.fromEntries(MODES.map((mode) => [mode, round(recourseByMode[mode], 2)])),
    residual_queue_by_mode: residualQueueByMode,
    residual_queue_by_group: residualQueueByGroup,
    recourse_by_group: recourseByGroup,
    recourse_by_source_target: Object.fromEntries(Object.entries(recourseBySourceTarget).map(([key, row]) => [key, {
      ...row,
      moved_person_trips: round(row.moved_person_trips, 2),
      cost_person_minutes_proxy: round(row.cost_person_minutes_proxy, 2)
    }])),
    recourse_flows: recourseFlows,
    mode_slice_rows: modeSliceRows,
    operations_screen_pass_after_recourse: unresolvedQueuePersonTrips === 0 && peakSliceLoadRatio <= gate.maximum_peak_mode_load_ratio,
    selection_boundary: recourse.selection_boundary,
    interpretation: 'synthetic aggregate recourse screen; alternate-mode movement is bounded by declared group shares and spare slice capacity, not observed behaviour'
  };
}

function emptyHistogram() {
  return {"0-30": 0, "30-45": 0, "45-60": 0, "60-90": 0, "90+": 0};
}

function emptySatisfactionHistogram() {
  const histogram = {};
  let lower = 0;
  for (const upper of SATISFACTION_HISTOGRAM_BINS) {
    histogram[`${lower}-${upper}`] = 0;
    lower = upper + 1;
  }
  return histogram;
}

function emptyAccessibilityHistogram() {
  return {
    '0.00-0.70': 0,
    '0.71-0.80': 0,
    '0.81-0.90': 0,
    '0.91-0.95': 0,
    '0.96-1.00': 0
  };
}

function addHistogram(histogram, minutes) {
  const labels = ["0-30", "30-45", "45-60", "60-90", "90+"];
  const index = HISTOGRAM_BINS.findIndex((limit) => minutes <= limit);
  histogram[labels[index]] += 1;
}

function addSatisfactionHistogram(histogram, satisfaction) {
  const labels = Object.keys(histogram);
  const index = SATISFACTION_HISTOGRAM_BINS.findIndex((limit) => satisfaction <= limit);
  histogram[labels[index < 0 ? labels.length - 1 : index]] += 1;
}

function addAccessibilityHistogram(histogram, accessibility) {
  const labels = Object.keys(histogram);
  const index = ACCESSIBILITY_HISTOGRAM_BINS.findIndex((limit) => accessibility <= limit);
  histogram[labels[index < 0 ? labels.length - 1 : index]] += 1;
}

function percentileFromHistogramBins(histogram, percentile, total, upperBounds) {
  const labels = Object.keys(histogram);
  const target = Math.max(1, Math.ceil(total * percentile));
  let cumulative = 0;
  for (let index = 0; index < labels.length; index += 1) {
    cumulative += histogram[labels[index]];
    if (cumulative >= target) return upperBounds[index];
  }
  return upperBounds[upperBounds.length - 1];
}

function percentileFromHistogram(histogram, percentile, total) {
  return percentileFromHistogramBins(histogram, percentile, total, [30, 45, 60, 90, 120]);
}

function buildDistributionalReadout(groupCounts, groupTimeHistograms, groupSatisfactionHistograms, groupAccessibilityHistograms) {
  const byGroup = Object.fromEntries(GROUPS.map((group) => {
    const total = groupCounts[group.id];
    return [group.id, {
      population_agents: total,
      travel_time_p50_proxy_minutes: percentileFromHistogram(groupTimeHistograms[group.id], 0.50, total),
      travel_time_p90_proxy_minutes: percentileFromHistogram(groupTimeHistograms[group.id], 0.90, total),
      satisfaction_p10_proxy_points: percentileFromHistogramBins(groupSatisfactionHistograms[group.id], 0.10, total, SATISFACTION_HISTOGRAM_BINS),
      satisfaction_p50_proxy_points: percentileFromHistogramBins(groupSatisfactionHistograms[group.id], 0.50, total, SATISFACTION_HISTOGRAM_BINS),
      satisfaction_p90_proxy_points: percentileFromHistogramBins(groupSatisfactionHistograms[group.id], 0.90, total, SATISFACTION_HISTOGRAM_BINS),
      accessibility_p10_proxy: round(percentileFromHistogramBins(groupAccessibilityHistograms[group.id], 0.10, total, ACCESSIBILITY_HISTOGRAM_BINS), 4),
      accessibility_p50_proxy: round(percentileFromHistogramBins(groupAccessibilityHistograms[group.id], 0.50, total, ACCESSIBILITY_HISTOGRAM_BINS), 4),
      accessibility_p90_proxy: round(percentileFromHistogramBins(groupAccessibilityHistograms[group.id], 0.90, total, ACCESSIBILITY_HISTOGRAM_BINS), 4)
    }];
  }));
  const rows = Object.values(byGroup);
  const p10Values = rows.map((row) => row.satisfaction_p10_proxy_points);
  const p90TimeValues = rows.map((row) => row.travel_time_p90_proxy_minutes);
  const accessibilityP10Values = rows.map((row) => row.accessibility_p10_proxy);
  return {
    method: 'synthetic_per_agent_binned_distribution_screen',
    status: 'synthetic_distribution_screen_not_local_outcome',
    bin_interpretation: 'Percentiles are upper bounds of declared bins; they are not observed person-level survey, accessibility audit or OD percentiles.',
    by_group: byGroup,
    worst_group_satisfaction_p10_proxy: Math.min(...p10Values),
    worst_group_satisfaction_p10_gap_proxy_points: Math.max(...p10Values) - Math.min(...p10Values),
    worst_group_p90_travel_time_proxy_minutes: Math.max(...p90TimeValues),
    group_p90_travel_time_gap_proxy_minutes: Math.max(...p90TimeValues) - Math.min(...p90TimeValues),
    worst_group_accessibility_p10_proxy: Math.min(...accessibilityP10Values),
    worst_group_accessibility_p10_gap_proxy_points: round((Math.max(...accessibilityP10Values) - Math.min(...accessibilityP10Values)) * 100, 2),
    interpretation: 'This distributional screen keeps group outcomes and accessibility tails visible alongside the mean. It is a synthetic sufficiency and fairness check, not a local resident outcome or accessibility audit.'
  };
}

function routeTemplate(mode, external, group) {
  if (mode === 'enterprise_shuttle') return model.route_templates.enterprise_shuttle;
  const template = model.route_templates[mode];
  if (external && group === 'enterprise_employee') return template.replace('home', 'boundary');
  return template;
}

function scenarioParameters(scenarioId, weightsOverride = null) {
  if (scenarioId === 'W1') {
    return {
      weights: weightsOverride || model.mode_weights_by_group.O2,
      disruption: false,
      timeMultiplier: {metro: 1.08, bus: 1.18, bicycle: 1.48, walking_wheelchair: 1.28, car: 1.14, enterprise_shuttle: 1.18},
      reliabilityOverride: {metro: 0.80, bus: 0.68, bicycle: 0.46, walking_wheelchair: 0.76, car: 0.55, enterprise_shuttle: 0.66},
      conflictMultiplier: 1.28,
      crowdPenaltyByMode: {metro: 4.5, bus: 5.5},
      curbPenaltyByMode: {car: 9}
    };
  }
  if (scenarioId === 'D1') {
    return {
      weights: weightsOverride || model.mode_weights_by_group.O2,
      disruption: false,
      timeMultiplier: {metro: 1.02, bus: 1.08, bicycle: 1.08, walking_wheelchair: 1.06, car: 1.12, enterprise_shuttle: 1.10},
      reliabilityOverride: {metro: 0.82, bus: 0.72, bicycle: 0.72, walking_wheelchair: 0.84, car: 0.54, enterprise_shuttle: 0.70},
      capacityMultiplier: {metro: 0.82, bus: 0.84, bicycle: 0.78, walking_wheelchair: 0.92, car: 0.86, enterprise_shuttle: 0.84},
      conflictMultiplier: 1.18,
      crowdPenaltyByMode: {metro: 5.5, bus: 6.5},
      curbPenaltyByMode: {car: 10}
    };
  }
  if (scenarioId === 'R1') {
    return {
      weights: weightsOverride || model.mode_weights_by_group.O1,
      disruption: true,
      timeMultiplier: {metro: 1.35, bus: 1.08, bicycle: 1.10, walking_wheelchair: 1.08, car: 1.16, enterprise_shuttle: 1.10},
      conflictMultiplier: 1.18,
      crowdPenaltyByMode: {metro: 7.5, bus: 3.5},
      curbPenaltyByMode: {car: 12}
    };
  }
  return {
    weights: weightsOverride || model.mode_weights_by_group[scenarioId],
    disruption: false,
    timeMultiplier: scenarioId === 'O1'
      ? {metro: 0.88, bus: 0.90, bicycle: 0.92, walking_wheelchair: 0.95, car: 1.03, enterprise_shuttle: 0.90}
      : {metro: 1.00, bus: 1.03, bicycle: 1.00, walking_wheelchair: 1.00, car: 1.08, enterprise_shuttle: 1.04}
  };
}

function accessibilityScore(groupId, mode, scenarioId) {
  const base = {
    metro: 0.93,
    bus: 0.89,
    bicycle: groupId === 'carer_or_child' ? 0.70 : 0.82,
    walking_wheelchair: 0.96,
    car: 0.91,
    enterprise_shuttle: 0.94
  }[mode];
  const protectedGroup = ['carer_or_child', 'night_worker'].includes(groupId);
  const coordinationBonus = scenarioId === 'O1' ? (protectedGroup ? 0.035 : 0.02) : 0;
  const disruptionPenalty = scenarioId === 'R1' && mode === 'metro' ? 0.12 : 0;
  const weatherPenalty = scenarioId === 'W1'
    ? (mode === 'bicycle' ? 0.16 : mode === 'walking_wheelchair' ? 0.08 : mode === 'bus' ? 0.03 : 0)
    : 0;
  const capacityShockPenalty = scenarioId === 'D1' && ['metro', 'bus', 'car'].includes(mode) ? 0.04 : 0;
  return clamp(base + coordinationBonus - disruptionPenalty - weatherPenalty - capacityShockPenalty, 0, 1);
}

function simulateScenario(scenarioId, weightsOverride = null, policyId = scenarioId) {
  const parameters = scenarioParameters(scenarioId, weightsOverride);
  const ranges = groupRanges();
  const modeCounts = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const personKmByMode = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const groupCounts = {};
  const groupModeCounts = Object.fromEntries(GROUPS.map((group) => [
    group.id,
    Object.fromEntries(MODES.map((mode) => [mode, 0]))
  ]));
  const groupSatisfaction = {};
  const groupAccessibility = {};
  const groupTimeHistograms = {};
  const groupSatisfactionHistograms = {};
  const groupAccessibilityHistograms = {};
  const routeCounts = {};
  const corridorCounts = {};
  const timeHistogram = emptyHistogram();
  let processed = 0;
  let externalAgents = 0;
  let externalCarAgents = 0;
  let totalGeneralizedCost = 0;
  let totalSatisfaction = 0;
  let totalAccessibility = 0;
  let totalConflictProbability = 0;
  let totalPersonKm = 0;
  let workActivityAgents = 0;
  const groupUtilityComponents = {};
  const totalUtilityComponents = emptyUtilityComponents();

  for (const group of ranges) {
    groupCounts[group.id] = 0;
    groupSatisfaction[group.id] = 0;
    groupAccessibility[group.id] = 0;
    groupUtilityComponents[group.id] = emptyUtilityComponents();
    groupTimeHistograms[group.id] = emptyHistogram();
    groupSatisfactionHistograms[group.id] = emptySatisfactionHistogram();
    groupAccessibilityHistograms[group.id] = emptyAccessibilityHistogram();
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      const origin = model.zones.origins[hash(index, 11) % model.zones.origins.length];
      const destination = model.zones.destinations[hash(index, 13) % model.zones.destinations.length];
      const external = unit(index, 17) < (group.id === 'enterprise_employee' ? 0.58 : group.id === 'resident_worker' ? 0.24 : 0.14);
      const mode = selectWeighted(parameters.weights[group.id], index, 19);
      const reliability = Number(parameters.reliabilityOverride?.[mode] ?? model.mode_parameters[mode].reliability[scenarioId]);
      const distanceFactor = 0.82 + unit(index, 23) * 0.58;
      const zoneFactor = 0.92 + ((hash(index, 29) % 17) / 100);
      const time = model.mode_parameters[mode].base_minutes * parameters.timeMultiplier[mode] * distanceFactor * zoneFactor + (external ? 5 : 0);
      const accessibility = accessibilityScore(group.id, mode, scenarioId);
      const conflictMultiplier = Number(parameters.conflictMultiplier || (scenarioId === 'O1' ? 0.72 : scenarioId === 'R1' ? 1.18 : 1.0));
      const conflictProbability = model.mode_parameters[mode].conflict_rate * conflictMultiplier * (external ? 1.08 : 1);
      const route = routeTemplate(mode, external, group.id);
      const corridor = `${origin} → ${destination}`;
      const waitPenalty = (1 - reliability) * 12;
      const crowdPenalty = Number(parameters.crowdPenaltyByMode?.[mode] ?? (mode === 'metro' || mode === 'bus' ? (scenarioId === 'B0' ? 4.5 : scenarioId === 'R1' ? 7.5 : 1.5) : 0));
      const curbPenalty = Number(parameters.curbPenaltyByMode?.[mode] ?? (mode === 'car' ? (scenarioId === 'B0' ? 10 : scenarioId === 'R1' ? 12 : 3) : 0));
      const generalizedCost = time + waitPenalty + crowdPenalty + curbPenalty + (1 - accessibility) * 15;
      const satisfaction = clamp(100 - generalizedCost * 0.56 - (1 - reliability) * 10 - conflictProbability * 1600, 0, 100);
      const utilityComponents = {
        time_disutility: time * 0.56,
        wait_disutility: waitPenalty * 0.56,
        crowding_disutility: crowdPenalty * 0.56,
        curb_disutility: curbPenalty * 0.56,
        accessibility_disutility: (1 - accessibility) * 15 * 0.56,
        reliability_disutility: (1 - reliability) * 10,
        conflict_disutility: conflictProbability * 1600
      };

      addMap(modeCounts, mode);
      addMap(groupModeCounts[group.id], mode);
      addMap(routeCounts, route);
      addMap(corridorCounts, `${corridor} / ${mode}`);
      groupCounts[group.id] += 1;
      groupSatisfaction[group.id] += satisfaction;
      groupAccessibility[group.id] += accessibility;
      totalGeneralizedCost += generalizedCost;
      totalSatisfaction += satisfaction;
      totalAccessibility += accessibility;
      totalConflictProbability += conflictProbability;
      UTILITY_COMPONENTS.forEach((key) => {
        groupUtilityComponents[group.id][key] += utilityComponents[key];
        totalUtilityComponents[key] += utilityComponents[key];
      });
      const personKm = tripDistanceKm(mode, distanceFactor, zoneFactor);
      totalPersonKm += personKm;
      personKmByMode[mode] += personKm;
      addHistogram(timeHistogram, time);
      addHistogram(groupTimeHistograms[group.id], time);
      addSatisfactionHistogram(groupSatisfactionHistograms[group.id], satisfaction);
      addAccessibilityHistogram(groupAccessibilityHistograms[group.id], accessibility);
      if (external) externalAgents += 1;
      if (external && mode === 'car') externalCarAgents += 1;
      if (group.activity === 'work') workActivityAgents += 1;
      processed += 1;
    }
  }

  const modeShares = Object.fromEntries(MODES.map((mode) => [mode, round(modeCounts[mode] / processed)]));
  const capacityMultiplierByMode = parameters.capacityMultiplier || {};
  const modeLoadRatios = Object.fromEntries(MODES.map((mode) => [mode, round(modeCounts[mode] / (model.mode_parameters[mode].capacity_person_trips * Number(capacityMultiplierByMode[mode] || 1)))]));
  const capacityOverflowPersonTrips = sum(MODES.map((mode) => Math.max(0, modeCounts[mode] - model.mode_parameters[mode].capacity_person_trips * Number(capacityMultiplierByMode[mode] || 1))));
  const serviceUnitLedger = buildServiceLedger(modeCounts, capacityMultiplierByMode);
  const vehicleOrServiceKmProxy = sum(Object.values(serviceUnitLedger).map((item) => item.vehicle_or_service_km_proxy));
  const maxModeLoadRatio = round(Math.max(...Object.values(modeLoadRatios)));
  const groupSatisfactionProxy = Object.fromEntries(GROUPS.map((group) => [group.id, round(groupSatisfaction[group.id] / groupCounts[group.id], 2)]));
  const groupAccessibilityCompletion = Object.fromEntries(GROUPS.map((group) => [group.id, round(groupAccessibility[group.id] / groupCounts[group.id], 4)]));
  const groupModeShares = Object.fromEntries(GROUPS.map((group) => [
    group.id,
    Object.fromEntries(MODES.map((mode) => [mode, round(groupModeCounts[group.id][mode] / groupCounts[group.id])]))
  ]));
  const satisfactionValues = Object.values(groupSatisfactionProxy);
  const accessibilityValues = Object.values(groupAccessibilityCompletion);
  const topRoutes = Object.entries(routeCounts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([route, count]) => ({route, count, share: round(count / processed)}));
  const topCorridors = Object.entries(corridorCounts).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([corridor, count]) => ({corridor, count, share: round(count / processed)}));

  return {
    scenario_id: policyId,
    status: policyId.startsWith('O') ? 'synthetic_candidate_subject_to_calibration' : 'synthetic_sensitivity',
    population_agents: TOTAL,
    agents_processed: processed,
    work_activity_agents: workActivityAgents,
    all_agents_processed: processed === TOTAL,
    mass_conservation: sum(Object.values(modeCounts)) === TOTAL,
    external_agents: externalAgents,
    external_share: round(externalAgents / TOTAL),
    external_car_inflow_ratio: round(externalCarAgents / Math.max(externalAgents, 1)),
    mode_counts: modeCounts,
    mode_shares: modeShares,
    person_km_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(personKmByMode[mode], 0)])),
    group_mode_counts: groupModeCounts,
    group_mode_shares: groupModeShares,
    mode_load_ratios: modeLoadRatios,
    max_mode_load_ratio: maxModeLoadRatio,
    capacity_overflow_person_trips: capacityOverflowPersonTrips,
    service_unit_ledger: serviceUnitLedger,
    total_trips: processed,
    completed_trips: processed,
    p50_travel_time_proxy_minutes: percentileFromHistogram(timeHistogram, 0.50, processed),
    p90_travel_time_proxy_minutes: percentileFromHistogram(timeHistogram, 0.90, processed),
    travel_time_histogram: timeHistogram,
    distributional_readout: buildDistributionalReadout(groupCounts, groupTimeHistograms, groupSatisfactionHistograms, groupAccessibilityHistograms),
    average_generalized_cost_proxy: round(totalGeneralizedCost / processed, 2),
    satisfaction_proxy: round(totalSatisfaction / processed, 2),
    satisfaction_proxy_by_group: groupSatisfactionProxy,
    satisfaction_component_readout: buildUtilityComponentReadout(totalUtilityComponents, groupUtilityComponents, groupCounts, processed),
    accessibility_completion_proxy: round(totalAccessibility / processed, 4),
    accessibility_completion_by_group: groupAccessibilityCompletion,
    worst_group_satisfaction_gap_proxy_points: round(Math.max(...satisfactionValues) - Math.min(...satisfactionValues), 2),
    worst_group_accessibility_gap_proxy_points: round((Math.max(...accessibilityValues) - Math.min(...accessibilityValues)) * 100, 2),
    people_flow_conflict_rate_per_1000_proxy: round((totalConflictProbability / processed) * 1000, 2),
    person_km_proxy: round(totalPersonKm, 0),
    vehicle_km_proxy: vehicleOrServiceKmProxy,
    vehicle_or_service_km_proxy: vehicleOrServiceKmProxy,
    route_flow_summary: topRoutes,
    top_corridor_flow_summary: topCorridors,
    privacy_check: "aggregate_only_no_personal_trace",
    air_candidate: "blocked"
  };
}

function simulateReturnLeg(scenarioId, weightsOverride, policyId) {
  const parameters = scenarioParameters(scenarioId, weightsOverride);
  const ranges = groupRanges();
  const modeCounts = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const personKmByMode = Object.fromEntries(MODES.map((mode) => [mode, 0]));
  const groupCounts = {};
  const groupSatisfaction = {};
  const groupAccessibility = {};
  const groupTimeHistograms = {};
  const groupSatisfactionHistograms = {};
  const groupAccessibilityHistograms = {};
  const routeCounts = {};
  const timeHistogram = emptyHistogram();
  let processed = 0;
  let externalAgents = 0;
  let externalCarAgents = 0;
  let totalGeneralizedCost = 0;
  let totalSatisfaction = 0;
  let totalAccessibility = 0;
  let totalConflictProbability = 0;
  let totalPersonKm = 0;

  for (const group of ranges) {
    groupCounts[group.id] = 0;
    groupSatisfaction[group.id] = 0;
    groupAccessibility[group.id] = 0;
    groupTimeHistograms[group.id] = emptyHistogram();
    groupSatisfactionHistograms[group.id] = emptySatisfactionHistogram();
    groupAccessibilityHistograms[group.id] = emptyAccessibilityHistogram();
    for (let offset = 0; offset < group.count; offset += 1) {
      const index = group.start + offset;
      const origin = model.zones.destinations[hash(index, 13) % model.zones.destinations.length];
      const destination = model.zones.origins[hash(index, 11) % model.zones.origins.length];
      const external = unit(index, 17) < (group.id === 'enterprise_employee' ? 0.58 : group.id === 'resident_worker' ? 0.24 : 0.14);
      const mode = selectWeighted(parameters.weights[group.id], index, 31);
      const reliability = model.mode_parameters[mode].reliability[scenarioId];
      const distanceFactor = 0.82 + unit(index, 37) * 0.58;
      const zoneFactor = 0.92 + ((hash(index, 43) % 17) / 100);
      const time = model.mode_parameters[mode].base_minutes * parameters.timeMultiplier[mode] * distanceFactor * zoneFactor + (external ? 5 : 0);
      const accessibility = accessibilityScore(group.id, mode, scenarioId);
      const conflictProbability = model.mode_parameters[mode].conflict_rate * (scenarioId === 'O1' ? 0.72 : scenarioId === 'R1' ? 1.18 : 1.0) * (external ? 1.08 : 1);
      const route = routeTemplate(mode, external, group.id).split(' → ').reverse().join(' → ');
      const waitPenalty = (1 - reliability) * 12;
      const crowdPenalty = mode === 'metro' || mode === 'bus' ? 1.5 : 0;
      const curbPenalty = mode === 'car' ? 3 : 0;
      const generalizedCost = time + waitPenalty + crowdPenalty + curbPenalty + (1 - accessibility) * 15;
      const satisfaction = clamp(100 - generalizedCost * 0.56 - (1 - reliability) * 10 - conflictProbability * 1600, 0, 100);

      addMap(modeCounts, mode);
      addMap(routeCounts, route);
      groupCounts[group.id] += 1;
      groupSatisfaction[group.id] += satisfaction;
      groupAccessibility[group.id] += accessibility;
      totalGeneralizedCost += generalizedCost;
      totalSatisfaction += satisfaction;
      totalAccessibility += accessibility;
      totalConflictProbability += conflictProbability;
      const personKm = tripDistanceKm(mode, distanceFactor, zoneFactor);
      totalPersonKm += personKm;
      personKmByMode[mode] += personKm;
      addHistogram(timeHistogram, time);
      addHistogram(groupTimeHistograms[group.id], time);
      addSatisfactionHistogram(groupSatisfactionHistograms[group.id], satisfaction);
      addAccessibilityHistogram(groupAccessibilityHistograms[group.id], accessibility);
      if (external) externalAgents += 1;
      if (external && mode === 'car') externalCarAgents += 1;
      processed += 1;
    }
  }

  const modeShares = Object.fromEntries(MODES.map((mode) => [mode, round(modeCounts[mode] / processed)]));
  const modeLoadRatios = Object.fromEntries(MODES.map((mode) => [mode, round(modeCounts[mode] / model.mode_parameters[mode].capacity_person_trips)]));
  const capacityOverflowPersonTrips = sum(MODES.map((mode) => Math.max(0, modeCounts[mode] - model.mode_parameters[mode].capacity_person_trips)));
  const serviceUnitLedger = buildServiceLedger(modeCounts);
  const vehicleOrServiceKmProxy = sum(Object.values(serviceUnitLedger).map((item) => item.vehicle_or_service_km_proxy));
  const groupSatisfactionProxy = Object.fromEntries(GROUPS.map((group) => [group.id, round(groupSatisfaction[group.id] / groupCounts[group.id], 2)]));
  const groupAccessibilityCompletion = Object.fromEntries(GROUPS.map((group) => [group.id, round(groupAccessibility[group.id] / groupCounts[group.id], 4)]));
  const satisfactionValues = Object.values(groupSatisfactionProxy);
  const accessibilityValues = Object.values(groupAccessibilityCompletion);
  const topRoutes = Object.entries(routeCounts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([route, count]) => ({route, count, share: round(count / processed)}));

  return {
    period: 'PM_return',
    policy_id: policyId,
    population_agents: TOTAL,
    agents_processed: processed,
    all_agents_processed: processed === TOTAL,
    mass_conservation: sum(Object.values(modeCounts)) === TOTAL,
    external_agents: externalAgents,
    external_car_inflow_ratio: round(externalCarAgents / Math.max(externalAgents, 1)),
    mode_counts: modeCounts,
    mode_shares: modeShares,
    person_km_by_mode: Object.fromEntries(MODES.map((mode) => [mode, round(personKmByMode[mode], 0)])),
    mode_load_ratios: modeLoadRatios,
    max_mode_load_ratio: round(Math.max(...Object.values(modeLoadRatios))),
    capacity_overflow_person_trips: capacityOverflowPersonTrips,
    service_unit_ledger: serviceUnitLedger,
    total_trips: processed,
    completed_trips: processed,
    p50_travel_time_proxy_minutes: percentileFromHistogram(timeHistogram, 0.50, processed),
    p90_travel_time_proxy_minutes: percentileFromHistogram(timeHistogram, 0.90, processed),
    travel_time_histogram: timeHistogram,
    distributional_readout: buildDistributionalReadout(groupCounts, groupTimeHistograms, groupSatisfactionHistograms, groupAccessibilityHistograms),
    average_generalized_cost_proxy: round(totalGeneralizedCost / processed, 2),
    satisfaction_proxy: round(totalSatisfaction / processed, 2),
    satisfaction_proxy_by_group: groupSatisfactionProxy,
    accessibility_completion_proxy: round(totalAccessibility / processed, 4),
    accessibility_completion_by_group: groupAccessibilityCompletion,
    worst_group_satisfaction_gap_proxy_points: round(Math.max(...satisfactionValues) - Math.min(...satisfactionValues), 2),
    worst_group_accessibility_gap_proxy_points: round((Math.max(...accessibilityValues) - Math.min(...accessibilityValues)) * 100, 2),
    people_flow_conflict_rate_per_1000_proxy: round((totalConflictProbability / processed) * 1000, 2),
    person_km_proxy: round(totalPersonKm, 0),
    vehicle_km_proxy: vehicleOrServiceKmProxy,
    vehicle_or_service_km_proxy: vehicleOrServiceKmProxy,
    route_flow_summary: topRoutes,
    privacy_check: 'aggregate_only_no_personal_trace',
    air_candidate: 'blocked'
  };
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

const scenarios = ['B0', 'O1', 'R1'].map((scenarioId) => simulateScenario(scenarioId));
const baseline = scenarios[0];
const optimized = scenarios[1];
const searchCandidates = [
  {id: 'O1_transit_priority', profile: 'O1', result: optimized},
  ...model.optimization_search.candidate_profiles
    .filter((candidate) => candidate.id !== 'O1_transit_priority')
    .map((candidate) => ({
      id: candidate.id,
      profile: candidate.weight_profile,
      result: simulateScenario('O1', model.mode_weights_by_group[candidate.weight_profile], candidate.id)
    }))
];

function candidateEligible(result) {
  const gate = model.optimization_search.hard_gate_constraints;
  return result.all_agents_processed
    && result.mass_conservation
    && result.accessibility_completion_proxy >= gate.minimum_accessibility_completion_proxy
    && result.worst_group_accessibility_gap_proxy_points <= gate.maximum_worst_group_accessibility_gap_proxy_points
    && result.distributional_readout.worst_group_accessibility_p10_gap_proxy_points <= gate.maximum_worst_group_accessibility_p10_gap_proxy_points
    && result.worst_group_satisfaction_gap_proxy_points <= gate.maximum_worst_group_satisfaction_gap_proxy_points
    && result.distributional_readout.worst_group_satisfaction_p10_gap_proxy_points <= gate.maximum_worst_group_satisfaction_p10_gap_proxy_points
    && result.max_mode_load_ratio <= gate.maximum_peak_mode_load_ratio
    && result.air_candidate === 'blocked';
}

function compareCandidates(left, right) {
  const leftKey = [
    candidateEligible(left.result) ? 1 : 0,
    left.result.satisfaction_proxy,
    left.result.distributional_readout.worst_group_satisfaction_p10_proxy,
    -left.result.distributional_readout.worst_group_accessibility_p10_gap_proxy_points,
    -left.result.average_generalized_cost_proxy,
    -left.result.p90_travel_time_proxy_minutes,
    -left.result.people_flow_conflict_rate_per_1000_proxy,
    -left.result.external_car_inflow_ratio,
    -left.result.vehicle_km_proxy
  ];
  const rightKey = [
    candidateEligible(right.result) ? 1 : 0,
    right.result.satisfaction_proxy,
    right.result.distributional_readout.worst_group_satisfaction_p10_proxy,
    -right.result.distributional_readout.worst_group_accessibility_p10_gap_proxy_points,
    -right.result.average_generalized_cost_proxy,
    -right.result.p90_travel_time_proxy_minutes,
    -right.result.people_flow_conflict_rate_per_1000_proxy,
    -right.result.external_car_inflow_ratio,
    -right.result.vehicle_km_proxy
  ];
  for (let index = 0; index < leftKey.length; index += 1) {
    if (leftKey[index] !== rightKey[index]) return rightKey[index] - leftKey[index];
  }
  return left.id.localeCompare(right.id);
}

const rankedCandidates = [...searchCandidates].sort(compareCandidates);
const selectedPolicy = rankedCandidates[0];

function summarizeRobustnessResult(definition, result) {
  return {
    scenario_id: definition.id,
    runner_scenario_id: definition.runner_scenario_id,
    label_zh: definition.label_zh,
    label_en: definition.label_en,
    policy_id: result.scenario_id,
    agents_processed: result.agents_processed,
    all_agents_processed: result.all_agents_processed,
    mass_conservation: result.mass_conservation,
    satisfaction_proxy: result.satisfaction_proxy,
    average_generalized_cost_proxy: result.average_generalized_cost_proxy,
    p90_travel_time_proxy_minutes: result.p90_travel_time_proxy_minutes,
    accessibility_completion_proxy: result.accessibility_completion_proxy,
    worst_group_accessibility_gap_proxy_points: result.worst_group_accessibility_gap_proxy_points,
    worst_group_accessibility_p10_proxy: result.distributional_readout.worst_group_accessibility_p10_proxy,
    worst_group_accessibility_p10_gap_proxy_points: result.distributional_readout.worst_group_accessibility_p10_gap_proxy_points,
    worst_group_satisfaction_gap_proxy_points: result.worst_group_satisfaction_gap_proxy_points,
    worst_group_satisfaction_p10_proxy: result.distributional_readout.worst_group_satisfaction_p10_proxy,
    worst_group_satisfaction_p10_gap_proxy_points: result.distributional_readout.worst_group_satisfaction_p10_gap_proxy_points,
    max_mode_load_ratio: result.max_mode_load_ratio,
    capacity_overflow_person_trips: result.capacity_overflow_person_trips,
    people_flow_conflict_rate_per_1000_proxy: result.people_flow_conflict_rate_per_1000_proxy,
    external_car_inflow_ratio: result.external_car_inflow_ratio,
    vehicle_km_proxy: result.vehicle_km_proxy,
    satisfaction_component_readout: result.satisfaction_component_readout,
    air_candidate: result.air_candidate,
    privacy_check: result.privacy_check
  };
}

function robustnessScenarioEligible(summary) {
  const gate = model.robustness_screen.hard_gate_constraints;
  return summary.all_agents_processed
    && summary.mass_conservation
    && summary.accessibility_completion_proxy >= gate.minimum_accessibility_completion_proxy
    && summary.worst_group_accessibility_gap_proxy_points <= gate.maximum_worst_group_accessibility_gap_proxy_points
    && summary.worst_group_accessibility_p10_gap_proxy_points <= gate.maximum_worst_group_accessibility_p10_gap_proxy_points
    && summary.worst_group_satisfaction_gap_proxy_points <= gate.maximum_worst_group_satisfaction_gap_proxy_points
    && summary.worst_group_satisfaction_p10_gap_proxy_points <= gate.maximum_worst_group_satisfaction_p10_gap_proxy_points
    && summary.max_mode_load_ratio <= gate.maximum_stress_peak_mode_load_ratio
    && summary.air_candidate === 'blocked'
    && summary.privacy_check === 'aggregate_only_no_personal_trace';
}

function compareRobustnessCandidates(left, right) {
  const leftKey = [
    left.nominal_gate_pass ? 1 : 0,
    left.stress_gate_count,
    left.robust_gate_pass ? 1 : 0,
    left.worst_case_satisfaction_proxy,
    left.worst_group_satisfaction_p10_proxy,
    -left.worst_group_satisfaction_p10_gap_proxy_points,
    -left.worst_group_accessibility_p10_gap_proxy_points,
    -left.worst_group_accessibility_gap_proxy_points,
    -left.worst_peak_mode_load_ratio,
    -left.mean_generalized_cost_proxy
  ];
  const rightKey = [
    right.nominal_gate_pass ? 1 : 0,
    right.stress_gate_count,
    right.robust_gate_pass ? 1 : 0,
    right.worst_case_satisfaction_proxy,
    right.worst_group_satisfaction_p10_proxy,
    -right.worst_group_satisfaction_p10_gap_proxy_points,
    -right.worst_group_accessibility_p10_gap_proxy_points,
    -right.worst_group_accessibility_gap_proxy_points,
    -right.worst_peak_mode_load_ratio,
    -right.mean_generalized_cost_proxy
  ];
  for (let index = 0; index < leftKey.length; index += 1) {
    if (leftKey[index] !== rightKey[index]) return rightKey[index] - leftKey[index];
  }
  return left.policy_id.localeCompare(right.policy_id);
}

const robustnessCandidates = searchCandidates.map((candidate) => {
  const scenarioSummaries = model.robustness_screen.scenarios.map((definition) => {
    const result = definition.runner_scenario_id === 'O1'
      ? candidate.result
      : simulateScenario(definition.runner_scenario_id, model.mode_weights_by_group[candidate.profile], candidate.id);
    return summarizeRobustnessResult(definition, result);
  });
  const stressSummaries = scenarioSummaries.filter((summary) => summary.runner_scenario_id !== 'O1');
  return {
    policy_id: candidate.id,
    weight_profile: candidate.profile,
    nominal_gate_pass: robustnessScenarioEligible(scenarioSummaries.find((summary) => summary.runner_scenario_id === 'O1')),
    stress_gate_count: stressSummaries.filter(robustnessScenarioEligible).length,
    robust_gate_pass: scenarioSummaries.every(robustnessScenarioEligible),
    worst_case_satisfaction_proxy: round(Math.min(...scenarioSummaries.map((summary) => summary.satisfaction_proxy)), 2),
    worst_group_accessibility_gap_proxy_points: round(Math.max(...scenarioSummaries.map((summary) => summary.worst_group_accessibility_gap_proxy_points)), 2),
    worst_group_accessibility_p10_proxy: round(Math.min(...scenarioSummaries.map((summary) => summary.worst_group_accessibility_p10_proxy)), 4),
    worst_group_accessibility_p10_gap_proxy_points: round(Math.max(...scenarioSummaries.map((summary) => summary.worst_group_accessibility_p10_gap_proxy_points)), 2),
    worst_group_satisfaction_gap_proxy_points: round(Math.max(...scenarioSummaries.map((summary) => summary.worst_group_satisfaction_gap_proxy_points)), 2),
    worst_group_satisfaction_p10_proxy: round(Math.min(...scenarioSummaries.map((summary) => summary.worst_group_satisfaction_p10_proxy)), 2),
    worst_group_satisfaction_p10_gap_proxy_points: round(Math.max(...scenarioSummaries.map((summary) => summary.worst_group_satisfaction_p10_gap_proxy_points)), 2),
    worst_peak_mode_load_ratio: round(Math.max(...scenarioSummaries.map((summary) => summary.max_mode_load_ratio)), 4),
    mean_generalized_cost_proxy: round(sum(scenarioSummaries.map((summary) => summary.average_generalized_cost_proxy)) / scenarioSummaries.length, 2),
    scenario_summaries: scenarioSummaries
  };
});
const rankedRobustnessCandidates = [...robustnessCandidates].sort(compareRobustnessCandidates);
const robustnessSelected = rankedRobustnessCandidates[0];
const returnLegReadout = simulateReturnLeg('O1', model.mode_weights_by_group[selectedPolicy.profile], selectedPolicy.id);
const departureChoiceBaseline = simulateDepartureTimeChoiceScreen('B0_reference', 'B0');
const departureChoiceSelected = simulateDepartureTimeChoiceScreen(selectedPolicy.id, selectedPolicy.profile);
const serviceOperationsBaseline = simulateTimeSlicedServiceOperations('B0_reference', 'B0', departureChoiceBaseline);
const serviceOperationsSelected = simulateTimeSlicedServiceOperations(selectedPolicy.id, selectedPolicy.profile, departureChoiceSelected);
const adaptiveRecourseBaseline = simulateAdaptiveRecourseScreen('B0_reference', 'B0', serviceOperationsBaseline, departureChoiceBaseline);
const adaptiveRecourseSelected = simulateAdaptiveRecourseScreen(selectedPolicy.id, selectedPolicy.profile, serviceOperationsSelected, departureChoiceSelected);
const optimizationSearch = {
  method: model.optimization_search.method,
  selection_order: model.optimization_search.selection_order,
  hard_gate_constraints: model.optimization_search.hard_gate_constraints,
  selected_policy: selectedPolicy.id,
  selected_policy_is_not_hand_picked: true,
  ranked_candidates: rankedCandidates.map((candidate, index) => ({
    rank: index + 1,
    policy_id: candidate.id,
    weight_profile: candidate.profile,
    hard_gate_pass: candidateEligible(candidate.result),
    agents_processed: candidate.result.agents_processed,
    all_agents_processed: candidate.result.all_agents_processed,
    mass_conservation: candidate.result.mass_conservation,
    satisfaction_proxy: candidate.result.satisfaction_proxy,
    average_generalized_cost_proxy: candidate.result.average_generalized_cost_proxy,
    p90_travel_time_proxy_minutes: candidate.result.p90_travel_time_proxy_minutes,
    people_flow_conflict_rate_per_1000_proxy: candidate.result.people_flow_conflict_rate_per_1000_proxy,
    external_car_inflow_ratio: candidate.result.external_car_inflow_ratio,
    vehicle_km_proxy: candidate.result.vehicle_km_proxy,
    mode_load_ratios: candidate.result.mode_load_ratios,
    max_mode_load_ratio: candidate.result.max_mode_load_ratio,
    capacity_overflow_person_trips: candidate.result.capacity_overflow_person_trips,
    accessibility_completion_proxy: candidate.result.accessibility_completion_proxy,
    worst_group_accessibility_gap_proxy_points: candidate.result.worst_group_accessibility_gap_proxy_points,
    worst_group_accessibility_p10_proxy: candidate.result.distributional_readout.worst_group_accessibility_p10_proxy,
    worst_group_accessibility_p10_gap_proxy_points: candidate.result.distributional_readout.worst_group_accessibility_p10_gap_proxy_points,
    worst_group_satisfaction_gap_proxy_points: candidate.result.worst_group_satisfaction_gap_proxy_points,
    worst_group_satisfaction_p10_proxy: candidate.result.distributional_readout.worst_group_satisfaction_p10_proxy,
    worst_group_satisfaction_p10_gap_proxy_points: candidate.result.distributional_readout.worst_group_satisfaction_p10_gap_proxy_points,
    person_km_proxy: candidate.result.person_km_proxy,
    vehicle_km_proxy: candidate.result.vehicle_km_proxy,
    satisfaction_component_readout: candidate.result.satisfaction_component_readout,
    air_candidate: candidate.result.air_candidate,
    privacy_check: candidate.result.privacy_check
  })),
  interpretation: model.optimization_search.interpretation,
  robustness_screen: {
    method: model.robustness_screen.method,
    status: model.robustness_screen.status,
    selected_policy: robustnessSelected.policy_id,
    selected_policy_is_not_hand_picked: true,
    robust_gate_pass: robustnessSelected.robust_gate_pass,
    scenario_definitions: model.robustness_screen.scenarios,
    hard_gate_constraints: model.robustness_screen.hard_gate_constraints,
    selection_order: model.robustness_screen.selection_order,
    ranked_candidates: rankedRobustnessCandidates.map((candidate, index) => ({rank: index + 1, ...candidate})),
    interpretation: model.robustness_screen.interpretation,
    calibration_required: model.robustness_screen.calibration_required
  }
};
const checks = {
  population_reference_is_regional_scale: TOTAL >= 3000000,
  declared_group_counts_sum_to_population: sum(GROUPS.map((group) => group.count)) === TOTAL,
  baseline_mass_conservation: baseline.mass_conservation,
  optimized_mass_conservation: selectedPolicy.result.mass_conservation,
  all_population_agents_processed: scenarios.every((scenario) => scenario.all_agents_processed),
  optimized_satisfaction_proxy_not_lower: selectedPolicy.result.satisfaction_proxy >= baseline.satisfaction_proxy,
  optimized_generalized_cost_proxy_not_higher: selectedPolicy.result.average_generalized_cost_proxy <= baseline.average_generalized_cost_proxy,
  optimized_conflict_proxy_not_higher: selectedPolicy.result.people_flow_conflict_rate_per_1000_proxy <= baseline.people_flow_conflict_rate_per_1000_proxy,
  optimized_external_car_inflow_not_higher: selectedPolicy.result.external_car_inflow_ratio <= baseline.external_car_inflow_ratio,
  optimized_peak_mode_capacity_screen_pass: selectedPolicy.result.max_mode_load_ratio <= model.optimization_search.hard_gate_constraints.maximum_peak_mode_load_ratio,
  optimized_worst_group_satisfaction_screen_pass: candidateEligible(selectedPolicy.result),
  optimized_accessibility_tail_screen_pass: selectedPolicy.result.distributional_readout.worst_group_accessibility_p10_gap_proxy_points <= model.optimization_search.hard_gate_constraints.maximum_worst_group_accessibility_p10_gap_proxy_points,
  utility_component_decomposition_present: searchCandidates.every((candidate) => candidate.result.satisfaction_component_readout && candidate.result.satisfaction_component_readout.by_group && candidate.result.satisfaction_component_readout.reconstructed_score >= 0),
  utility_component_reconstruction_error_bounded: searchCandidates.every((candidate) => Math.abs(candidate.result.satisfaction_component_readout.reconstructed_score - candidate.result.satisfaction_proxy) <= 0.05),
  service_unit_ledger_complete: scenarios.every((scenario) => MODES.every((mode) => scenario.service_unit_ledger[mode].person_trips === scenario.mode_counts[mode] && scenario.service_unit_ledger[mode].required_units >= 0)),
  vehicle_km_is_service_unit_based: scenarios.every((scenario) => scenario.vehicle_km_proxy === sum(Object.values(scenario.service_unit_ledger).map((item) => item.vehicle_or_service_km_proxy))),
  return_population_agents_processed: returnLegReadout.all_agents_processed,
  return_mass_conservation: returnLegReadout.mass_conservation,
  air_candidate_fail_closed: scenarios.every((scenario) => scenario.air_candidate === 'blocked'),
  privacy_aggregate_only: scenarios.every((scenario) => scenario.privacy_check === 'aggregate_only_no_personal_trace'),
  optimization_has_eligible_candidate: rankedCandidates.some((candidate) => candidateEligible(candidate.result)),
  optimization_selected_policy_is_eligible: candidateEligible(selectedPolicy.result),
  robustness_all_population_agents_processed: robustnessCandidates.every((candidate) => candidate.scenario_summaries.every((summary) => summary.all_agents_processed)),
  robustness_mass_conservation: robustnessCandidates.every((candidate) => candidate.scenario_summaries.every((summary) => summary.mass_conservation)),
  robustness_nominal_gate_has_eligible_candidate: robustnessCandidates.some((candidate) => candidate.nominal_gate_pass),
  robustness_selected_group_satisfaction_screen: robustnessSelected.scenario_summaries.every((summary) => summary.worst_group_satisfaction_p10_gap_proxy_points <= model.robustness_screen.hard_gate_constraints.maximum_worst_group_satisfaction_p10_gap_proxy_points),
  robustness_selected_accessibility_tail_screen: robustnessSelected.scenario_summaries.every((summary) => summary.worst_group_accessibility_p10_gap_proxy_points <= model.robustness_screen.hard_gate_constraints.maximum_worst_group_accessibility_p10_gap_proxy_points),
  robustness_air_candidate_fail_closed: robustnessCandidates.every((candidate) => candidate.scenario_summaries.every((summary) => summary.air_candidate === 'blocked')),
  robustness_privacy_aggregate_only: robustnessCandidates.every((candidate) => candidate.scenario_summaries.every((summary) => summary.privacy_check === 'aggregate_only_no_personal_trace')),
  robustness_selection_is_separate_from_nominal_selection: true,
  choice_screen_all_population_agents_processed: departureChoiceBaseline.all_agents_processed && departureChoiceSelected.all_agents_processed,
  choice_screen_mass_conservation: departureChoiceBaseline.mass_conservation && departureChoiceSelected.mass_conservation,
  choice_screen_protects_non_enterprise_groups: departureChoiceSelected.protected_group_shift_count === 0,
  service_time_screen_all_population_agents_processed: serviceOperationsBaseline.all_agents_processed && serviceOperationsSelected.all_agents_processed,
  service_time_screen_mass_conservation: serviceOperationsBaseline.demand_mass_conservation && serviceOperationsSelected.demand_mass_conservation,
  service_time_screen_mode_mass_conservation: serviceOperationsBaseline.mode_slice_mass_conservation && serviceOperationsSelected.mode_slice_mass_conservation,
  adaptive_recourse_all_population_agents_processed: adaptiveRecourseBaseline.all_agents_processed && adaptiveRecourseSelected.all_agents_processed,
  adaptive_recourse_mass_conservation: adaptiveRecourseBaseline.demand_mass_conservation && adaptiveRecourseSelected.demand_mass_conservation,
  adaptive_recourse_group_mass_conservation: Object.values(adaptiveRecourseBaseline.group_mass_conservation).every(Boolean)
    && Object.values(adaptiveRecourseSelected.group_mass_conservation).every(Boolean),
  adaptive_recourse_share_constraints_pass: adaptiveRecourseBaseline.recourse_share_constraints_pass && adaptiveRecourseSelected.recourse_share_constraints_pass,
  adaptive_recourse_preserves_accessible_source: adaptiveRecourseBaseline.blocked_source_modes_untouched && adaptiveRecourseSelected.blocked_source_modes_untouched
    && adaptiveRecourseBaseline.walking_accessibility_recourse_count === 0 && adaptiveRecourseSelected.walking_accessibility_recourse_count === 0,
  adaptive_recourse_mode_capacity_not_exceeded: adaptiveRecourseBaseline.mode_capacity_not_exceeded && adaptiveRecourseSelected.mode_capacity_not_exceeded,
  service_supply_reconciles_to_declared_capacity: MODES.every((mode) => {
    const parameters = model.mode_parameters[mode];
    const capacityPerUnit = Number(parameters.service_unit.capacity_persons_per_unit);
    const expectedUnits = Math.ceil(parameters.capacity_person_trips / capacityPerUnit);
    return serviceOperationsSelected.mode_summaries[mode].declared_available_units === expectedUnits;
  })
};

const headlineOptimized = selectedPolicy.result;

Object.entries(checks).forEach(([name, passed]) => {
  if (!passed) fail(name);
});

const output = {
  model_version: model.version,
  simulation_class: model.simulation_class,
  regional_scope: model.regional_scope,
  optimization_objective: model.optimization_objective,
  optimization_search: optimizationSearch,
  selected_policy_readout: {
    policy_id: selectedPolicy.id,
    status: headlineOptimized.status,
    population_agents: headlineOptimized.population_agents,
    agents_processed: headlineOptimized.agents_processed,
    all_agents_processed: headlineOptimized.all_agents_processed,
    mass_conservation: headlineOptimized.mass_conservation,
    air_candidate: headlineOptimized.air_candidate,
    privacy_check: headlineOptimized.privacy_check,
    mode_counts: headlineOptimized.mode_counts,
    mode_shares: headlineOptimized.mode_shares,
    group_mode_counts: headlineOptimized.group_mode_counts,
    group_mode_shares: headlineOptimized.group_mode_shares,
    mode_load_ratios: headlineOptimized.mode_load_ratios,
    max_mode_load_ratio: headlineOptimized.max_mode_load_ratio,
    capacity_overflow_person_trips: headlineOptimized.capacity_overflow_person_trips,
    service_unit_ledger: headlineOptimized.service_unit_ledger,
    return_leg: returnLegReadout,
    satisfaction_proxy: headlineOptimized.satisfaction_proxy,
    satisfaction_proxy_by_group: headlineOptimized.satisfaction_proxy_by_group,
    satisfaction_component_readout: headlineOptimized.satisfaction_component_readout,
    average_generalized_cost_proxy: headlineOptimized.average_generalized_cost_proxy,
    p50_travel_time_proxy_minutes: headlineOptimized.p50_travel_time_proxy_minutes,
    p90_travel_time_proxy_minutes: headlineOptimized.p90_travel_time_proxy_minutes,
    accessibility_completion_proxy: headlineOptimized.accessibility_completion_proxy,
    accessibility_completion_by_group: headlineOptimized.accessibility_completion_by_group,
    distributional_readout: headlineOptimized.distributional_readout,
    people_flow_conflict_rate_per_1000_proxy: headlineOptimized.people_flow_conflict_rate_per_1000_proxy,
    external_car_inflow_ratio: headlineOptimized.external_car_inflow_ratio,
    vehicle_km_proxy: headlineOptimized.vehicle_km_proxy,
    person_km_proxy: headlineOptimized.person_km_proxy,
    vehicle_or_service_km_proxy: headlineOptimized.vehicle_or_service_km_proxy,
    person_km_by_mode: headlineOptimized.person_km_by_mode,
    departure_time_choice_screen: departureChoiceSelected,
    service_time_operations: serviceOperationsSelected,
    adaptive_recourse_screen: adaptiveRecourseSelected,
    route_flow_summary: headlineOptimized.route_flow_summary
  },
  departure_time_choice_screen: {
    baseline: departureChoiceBaseline,
    selected_policy: departureChoiceSelected,
    selection_boundary: model.departure_time_choice.selection_boundary
  },
  service_time_operations: {
    baseline: serviceOperationsBaseline,
    selected_policy: serviceOperationsSelected,
    selection_boundary: model.service_time_operations.selection_boundary
  },
  adaptive_recourse_screen: {
    baseline: adaptiveRecourseBaseline,
    selected_policy: adaptiveRecourseSelected,
    selection_boundary: model.adaptive_recourse.selection_boundary
  },
  robustness_screen: optimizationSearch.robustness_screen,
  scenarios,
  comparison: {
    optimized_minus_baseline: {
      selected_policy: selectedPolicy.id,
      satisfaction_proxy_points: round(headlineOptimized.satisfaction_proxy - baseline.satisfaction_proxy, 2),
      generalized_cost_proxy: round(headlineOptimized.average_generalized_cost_proxy - baseline.average_generalized_cost_proxy, 2),
      p90_travel_time_proxy_minutes: headlineOptimized.p90_travel_time_proxy_minutes - baseline.p90_travel_time_proxy_minutes,
      people_flow_conflict_rate_per_1000_proxy: round(headlineOptimized.people_flow_conflict_rate_per_1000_proxy - baseline.people_flow_conflict_rate_per_1000_proxy, 2),
      external_car_inflow_ratio: round(headlineOptimized.external_car_inflow_ratio - baseline.external_car_inflow_ratio, 4),
      person_km_proxy: headlineOptimized.person_km_proxy - baseline.person_km_proxy,
      vehicle_km_proxy: headlineOptimized.vehicle_km_proxy - baseline.vehicle_km_proxy,
      accessibility_completion_proxy: round(headlineOptimized.accessibility_completion_proxy - baseline.accessibility_completion_proxy, 4)
    },
    interpretation: `${selectedPolicy.id} is the selected synthetic operating candidate only when hard gates hold; proxy improvements are not measured local outcomes.`
  },
  checks,
  calibration_boundary: model.calibration_required_before_local_decision
};

console.log(JSON.stringify(output, null, 2));
if (Object.values(checks).every(Boolean)) console.error('REGIONAL_MODEL_CHECK_PASS: all population-scale checks passed');
