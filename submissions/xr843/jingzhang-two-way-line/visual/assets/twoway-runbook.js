/**
 * 对开协议·运行图（浏览器副本 / browser copy of twoway-runbook.json）
 *
 * 本文件由 twoway-runbook.json 逐字段生成，供展示页离线读取——展示页禁用
 * 任何网络请求，因此数据必须内联而不能异步加载。JSON 主本仍是唯一权威来源；
 * run_twoway_tabletop.js 每次运行都会比对两者，不一致即判红并以非零码退出。
 *
 * 请勿手工编辑本文件，改 twoway-runbook.json 后重新生成。
 */

var TWOWAY_RUNBOOK = {
  "schema_version": "0.1.0",
  "protocol": "对开协议 / Two-Way Protocol",
  "receipt_schema": "twoway-protocol.schema.json",
  "rules_source": "proposal.md §6.2 十二张AI场景卡、§6.3 映射规则、§3.2 命名体系",
  "disclaimer_zh": "本运行图是方案建议的机读形式，用于让评审者可复算地检验「对开协议」是否真的成立。所有机构名称（运行图管委会、三站乘务组、两台协调人等）均为本方案提出的概念性运营架构，不是既有机构、已获批准的行政安排或政府承诺；班次状态一律为 proposed 或 scheduled，不表示已批准运营。",
  "rules": [
    {
      "rule_id": "R1_THREE_ELEMENTS",
      "statement_zh": "每个班次必须声明节点（空间）、运营主体（运营）、上下行清单（数据与回报）三要素，缺一不得排图。",
      "source": "proposal.md §6.3"
    },
    {
      "rule_id": "R2_NO_TAKE_WITHOUT_RETURN",
      "statement_zh": "上行的数据与算力必须配下行的服务与公共回报，禁止只取不还；下行须有可被公众核对的承诺形式。",
      "source": "proposal.md 摘要第4条、§6.2"
    },
    {
      "rule_id": "R3_WHO_CAN_HALT",
      "statement_zh": "班次卡按「上行采集什么、下行回报什么、谁能叫停」三问编制，叫停主体必须确定。",
      "source": "proposal.md §6.2"
    },
    {
      "rule_id": "R4_PRIVACY_REDLINE",
      "statement_zh": "不做人脸识别布控、不采集可识别个体轨迹。",
      "source": "proposal.md §6.2"
    },
    {
      "rule_id": "R5_NON_AI_FALLBACK",
      "statement_zh": "每个班次必须有非AI等价服务路径。",
      "source": "proposal.md §6.2"
    },
    {
      "rule_id": "R6_TEST_NOT_APPROVED",
      "statement_zh": "测试场景（T字头）不得表述为已批准运营。",
      "source": "proposal.md §6.2"
    }
  ],
  "services": [
    {
      "service_id": "T1",
      "name_zh": "低速无人配送走廊测试",
      "name_en": "Low-speed autonomous delivery corridor test",
      "node": "众智站清河湾段",
      "operator": "众智站乘务组",
      "uplink": {
        "takes": "脱敏运行数据",
        "data_classes": [
          "desensitized_operational"
        ]
      },
      "downlink": {
        "returns": "社区免费配送时段",
        "beneficiary": "清河湾沿线社区居民",
        "public_commitment": "免费时段与覆盖范围按月公示"
      },
      "review_and_exit": {
        "mechanism": "现场急停与运行图下线",
        "who_can_halt": "现场安全员、运行图管委会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "配送异常由人工调度接管"
      },
      "non_ai_fallback": "保留人工配送班次",
      "status": "proposed"
    },
    {
      "service_id": "T2",
      "name_zh": "AI交通与慢行断点调度测试",
      "name_en": "AI traffic and walkability bottleneck scheduling test",
      "node": "知春路、北四环道口",
      "operator": "东台场景协调人",
      "uplink": {
        "takes": "匿名流量统计",
        "data_classes": [
          "anonymous_aggregate"
        ]
      },
      "downlink": {
        "returns": "步行等灯时间缩短公示",
        "beneficiary": "道口过街行人",
        "public_commitment": "调度前后等灯时长对照公示"
      },
      "review_and_exit": {
        "mechanism": "信号回退人工方案",
        "who_can_halt": "道口值守、运行图管委会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "信号策略变更需人工确认"
      },
      "non_ai_fallback": "回退既有固定配时方案",
      "status": "proposed"
    },
    {
      "service_id": "T3",
      "name_zh": "企业服务智能体合规沙盒",
      "name_en": "Enterprise service agent compliance sandbox",
      "node": "大钟站商务组团",
      "operator": "大钟站乘务组",
      "uplink": {
        "takes": "企业授权工单",
        "data_classes": [
          "authorized_business"
        ]
      },
      "downlink": {
        "returns": "中小企业免费额度",
        "beneficiary": "组团内中小企业",
        "public_commitment": "免费额度与用量按季公示"
      },
      "review_and_exit": {
        "mechanism": "人工客服全程可切换",
        "who_can_halt": "企业用户、运行图管委会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "工单可随时转人工"
      },
      "non_ai_fallback": "全程人工客服通道",
      "status": "proposed"
    },
    {
      "service_id": "S4",
      "name_zh": "多语文化导览",
      "name_en": "Multilingual heritage guide",
      "node": "里程碑道K0至K9",
      "operator": "里程碑道共创社区",
      "uplink": {
        "takes": "匿名点位热力",
        "data_classes": [
          "anonymous_aggregate"
        ]
      },
      "downlink": {
        "returns": "四语遗产讲解",
        "beneficiary": "沿线访客与国际观众",
        "public_commitment": "讲解文本与来源公开可查"
      },
      "review_and_exit": {
        "mechanism": "内容人工审校",
        "who_can_halt": "内容审校组"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "史实表述逐条人工审校"
      },
      "non_ai_fallback": "纸质导览图与人工讲解",
      "status": "proposed"
    },
    {
      "service_id": "S5",
      "name_zh": "健康服务导航",
      "name_en": "Health service navigation",
      "node": "学院路社区界面",
      "operator": "东台场景协调人",
      "uplink": {
        "takes": "自愿健康咨询",
        "data_classes": [
          "voluntary_consented"
        ]
      },
      "downlink": {
        "returns": "老年就医陪导",
        "beneficiary": "社区老年居民",
        "public_commitment": "陪导服务时段与人次公示"
      },
      "review_and_exit": {
        "mechanism": "医师复核且数据即焚",
        "who_can_halt": "复核医师、参与居民"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "建议一律经执业医师复核"
      },
      "non_ai_fallback": "社区服务站人工导医",
      "status": "proposed"
    },
    {
      "service_id": "S6",
      "name_zh": "公共安全运行复盘",
      "name_en": "Public safety after-action review",
      "node": "对开门到达厅",
      "operator": "对开门站区运营组",
      "uplink": {
        "takes": "事件复盘数据",
        "data_classes": [
          "desensitized_operational"
        ]
      },
      "downlink": {
        "returns": "演练结果公示",
        "beneficiary": "站区旅客与周边居民",
        "public_commitment": "演练结论与改进项公示"
      },
      "review_and_exit": {
        "mechanism": "仅事后分析不实时布控",
        "who_can_halt": "运行图管委会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "仅对已脱敏事件记录做事后分析"
      },
      "non_ai_fallback": "既有人工复盘会议",
      "status": "proposed"
    },
    {
      "service_id": "S7",
      "name_zh": "算力舱余热调度",
      "name_en": "Edge compute waste-heat scheduling",
      "node": "双河冷环示范段",
      "operator": "众智站乘务组",
      "uplink": {
        "takes": "设备温度遥测",
        "data_classes": [
          "environmental_sensor"
        ]
      },
      "downlink": {
        "returns": "冬季暖廊开放",
        "beneficiary": "明线冬季步行者",
        "public_commitment": "暖廊开放时段公示"
      },
      "review_and_exit": {
        "mechanism": "热网人工旁路",
        "who_can_halt": "热网值班、运行图管委会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "调度阈值变更需人工确认"
      },
      "non_ai_fallback": "按固定时序运行的常规热网",
      "status": "proposed"
    },
    {
      "service_id": "S8",
      "name_zh": "开源模型首发日",
      "name_en": "Open-source model launch day",
      "node": "清华园车站发车厅",
      "operator": "原点站乘务组",
      "uplink": {
        "takes": "发布会登记",
        "data_classes": [
          "voluntary_consented"
        ]
      },
      "downlink": {
        "returns": "模型卡与权重公开",
        "beneficiary": "开发者社区与公众",
        "public_commitment": "模型卡、许可与权重同日公开"
      },
      "review_and_exit": {
        "mechanism": "社区评审前置",
        "who_can_halt": "社区评审会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "发布内容经社区评审"
      },
      "non_ai_fallback": "线下发布与纸质模型卡",
      "status": "proposed"
    },
    {
      "service_id": "S9",
      "name_zh": "无障碍步行代理",
      "name_en": "Accessible walking agent",
      "node": "八处道口",
      "operator": "东台场景协调人",
      "uplink": {
        "takes": "无障碍设施状态",
        "data_classes": [
          "public_registry"
        ]
      },
      "downlink": {
        "returns": "视障领航服务",
        "beneficiary": "视障与行动不便者",
        "public_commitment": "设施状态与修复时限公开"
      },
      "review_and_exit": {
        "mechanism": "志愿者热线兜底",
        "who_can_halt": "志愿者热线、参与用户"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "领航异常转人工热线"
      },
      "non_ai_fallback": "志愿者陪同与实体导盲设施",
      "status": "proposed"
    },
    {
      "service_id": "S10",
      "name_zh": "校园成果转化撮合",
      "name_en": "Campus tech-transfer matchmaking",
      "node": "原点站报告厅",
      "operator": "西台产业导师",
      "uplink": {
        "takes": "授权成果清单",
        "data_classes": [
          "authorized_business"
        ]
      },
      "downlink": {
        "returns": "校地共享收益公示",
        "beneficiary": "高校团队与属地",
        "public_commitment": "收益分配规则与结果公示"
      },
      "review_and_exit": {
        "mechanism": "技术经理人复核",
        "who_can_halt": "技术经理人、成果权属方"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "撮合建议经技术经理人复核"
      },
      "non_ai_fallback": "线下路演与人工对接",
      "status": "proposed"
    },
    {
      "service_id": "S11",
      "name_zh": "街区微气候感知",
      "name_en": "Block microclimate sensing",
      "node": "明线全线",
      "operator": "明线运维组",
      "uplink": {
        "takes": "温湿风光传感",
        "data_classes": [
          "environmental_sensor"
        ]
      },
      "downlink": {
        "returns": "高温预警与遮荫导航",
        "beneficiary": "明线步行者",
        "public_commitment": "传感点位与读数公开可审计"
      },
      "review_and_exit": {
        "mechanism": "传感点位公示可关停",
        "who_can_halt": "点位属地、运行图管委会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "预警发布前人工确认"
      },
      "non_ai_fallback": "固定遮荫设施与常规气象预报",
      "status": "proposed"
    },
    {
      "service_id": "S12",
      "name_zh": "绿电报时",
      "name_en": "Green-power hourly chime",
      "node": "绿电大钟广场",
      "operator": "大钟站乘务组",
      "uplink": {
        "takes": "走廊绿电占比数据",
        "data_classes": [
          "public_registry"
        ]
      },
      "downlink": {
        "returns": "每日整点声光报时",
        "beneficiary": "广场公众",
        "public_commitment": "数据源与口径公示可审计"
      },
      "review_and_exit": {
        "mechanism": "数据源公示可审计",
        "who_can_halt": "数据源审计方、运行图管委会"
      },
      "privacy": {
        "face_recognition_surveillance": false,
        "identifiable_trajectory": false,
        "human_review": "口径变更需人工公告"
      },
      "non_ai_fallback": "机械报时与公示牌",
      "status": "proposed"
    }
  ],
  "rejection_cases": [
    {
      "case_id": "X1",
      "must_violate": "R1_THREE_ELEMENTS",
      "why_zh": "缺运营主体：三要素缺一，按协议不得排图。",
      "receipt": {
        "service_id": "S90",
        "name_zh": "无主体的街区问答",
        "node": "明线中段",
        "operator": "",
        "uplink": {
          "takes": "匿名提问日志",
          "data_classes": [
            "anonymous_aggregate"
          ]
        },
        "downlink": {
          "returns": "街区问答看板",
          "beneficiary": "路过公众",
          "public_commitment": "看板内容公开"
        },
        "review_and_exit": {
          "mechanism": "人工下线",
          "who_can_halt": "运行图管委会"
        },
        "privacy": {
          "face_recognition_surveillance": false,
          "identifiable_trajectory": false
        },
        "non_ai_fallback": "公告栏",
        "status": "proposed"
      }
    },
    {
      "case_id": "X2",
      "must_violate": "R2_NO_TAKE_WITHOUT_RETURN",
      "why_zh": "只取不还：有上行采集但下行没有可核对的公共承诺。",
      "receipt": {
        "service_id": "S91",
        "name_zh": "只采不还的客流画像",
        "node": "原点站广场",
        "operator": "原点站乘务组",
        "uplink": {
          "takes": "到访频次统计",
          "data_classes": [
            "anonymous_aggregate"
          ]
        },
        "downlink": {
          "returns": "内部运营优化",
          "beneficiary": "运营方",
          "public_commitment": ""
        },
        "review_and_exit": {
          "mechanism": "季度评估",
          "who_can_halt": "运行图管委会"
        },
        "privacy": {
          "face_recognition_surveillance": false,
          "identifiable_trajectory": false
        },
        "non_ai_fallback": "人工计数",
        "status": "proposed"
      }
    },
    {
      "case_id": "X3",
      "must_violate": "R3_WHO_CAN_HALT",
      "why_zh": "无叫停主体：只写了机制没写谁能叫停。",
      "receipt": {
        "service_id": "S92",
        "name_zh": "无人可叫停的导览",
        "node": "里程碑道K3",
        "operator": "里程碑道共创社区",
        "uplink": {
          "takes": "匿名点位热力",
          "data_classes": [
            "anonymous_aggregate"
          ]
        },
        "downlink": {
          "returns": "语音导览",
          "beneficiary": "访客",
          "public_commitment": "讲解文本公开"
        },
        "review_and_exit": {
          "mechanism": "系统自动巡检",
          "who_can_halt": ""
        },
        "privacy": {
          "face_recognition_surveillance": false,
          "identifiable_trajectory": false
        },
        "non_ai_fallback": "纸质导览",
        "status": "proposed"
      }
    },
    {
      "case_id": "X4",
      "must_violate": "R4_PRIVACY_REDLINE",
      "why_zh": "触碰隐私红线：声明了人脸识别布控与可识别个体轨迹。",
      "receipt": {
        "service_id": "S93",
        "name_zh": "越线的安防布控",
        "node": "对开门到达厅",
        "operator": "对开门站区运营组",
        "uplink": {
          "takes": "实时人脸比对与轨迹跟踪",
          "data_classes": [
            "desensitized_operational"
          ]
        },
        "downlink": {
          "returns": "安防响应提速",
          "beneficiary": "站区旅客",
          "public_commitment": "响应时长公示"
        },
        "review_and_exit": {
          "mechanism": "人工复核",
          "who_can_halt": "运行图管委会"
        },
        "privacy": {
          "face_recognition_surveillance": true,
          "identifiable_trajectory": true
        },
        "non_ai_fallback": "人工巡查",
        "status": "proposed"
      }
    },
    {
      "case_id": "X5",
      "must_violate": "R5_NON_AI_FALLBACK",
      "why_zh": "无非AI等价路径：AI 失效即服务中断。",
      "receipt": {
        "service_id": "S94",
        "name_zh": "唯AI通道的政务问答",
        "node": "大钟站商务组团",
        "operator": "大钟站乘务组",
        "uplink": {
          "takes": "企业授权工单",
          "data_classes": [
            "authorized_business"
          ]
        },
        "downlink": {
          "returns": "工单自动办结",
          "beneficiary": "企业用户",
          "public_commitment": "办结时长公示"
        },
        "review_and_exit": {
          "mechanism": "异常告警",
          "who_can_halt": "运行图管委会"
        },
        "privacy": {
          "face_recognition_surveillance": false,
          "identifiable_trajectory": false
        },
        "non_ai_fallback": "",
        "status": "proposed"
      }
    },
    {
      "case_id": "X6",
      "must_violate": "R6_TEST_NOT_APPROVED",
      "why_zh": "测试班次写成已排图运营：T字头不得表述为已批准运营。",
      "receipt": {
        "service_id": "T9",
        "name_zh": "自称已运营的测试班次",
        "node": "众智站清河湾段",
        "operator": "众智站乘务组",
        "uplink": {
          "takes": "脱敏运行数据",
          "data_classes": [
            "desensitized_operational"
          ]
        },
        "downlink": {
          "returns": "社区免费配送时段",
          "beneficiary": "沿线居民",
          "public_commitment": "时段公示"
        },
        "review_and_exit": {
          "mechanism": "现场急停",
          "who_can_halt": "现场安全员"
        },
        "privacy": {
          "face_recognition_surveillance": false,
          "identifiable_trajectory": false
        },
        "non_ai_fallback": "人工配送",
        "status": "scheduled"
      }
    }
  ]
};

if (typeof module === 'object' && module.exports) { module.exports = TWOWAY_RUNBOOK; }
else { (typeof globalThis !== 'undefined' ? globalThis : this).TWOWAY_RUNBOOK = TWOWAY_RUNBOOK; }
