// 功能支持矩阵数据 - 严格基于各品牌官方公布的能力
// 状态说明：✅ 已上线 | 🔜 计划中 | ❌ 不支持 | ⚠️ 部分车型
// 数据来源：各品牌官方发布会、OTA公告、工信部公告
// 更新时间：2026年6月

export type FeatureStatus = "✅" | "🔜" | "❌" | "⚠️";

export interface FeatureItem {
  id: string;
  name: string;
  category: string;
  description: string;
  brands: Record<string, FeatureStatus>;
}

export interface FeatureCategory {
  id: string;
  name: string;
  icon: string;
  features: FeatureItem[];
}

export const featureCategories: FeatureCategory[] = [
  {
    id: "driving",
    name: "行车辅助",
    icon: "car",
    features: [
      {
        id: "highway-noa",
        name: "高速NOA",
        category: "driving",
        description: "高速公路领航辅助，自动变道/上下匝道/超车",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "✅", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "✅" },
      },
      {
        id: "city-noa",
        name: "城区NOA",
        category: "driving",
        description: "城市道路领航辅助，路口通行/红绿灯识别/行人避让",
        brands: { huawei: "✅", tesla: "⚠️", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "✅", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "✅" },
      },
      {
        id: "map-free",
        name: "无图智驾",
        category: "driving",
        description: "不依赖高精地图实现NOA，实时感知决策",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "✅", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "⚠️" },
      },
      {
        id: "e2e",
        name: "端到端架构",
        category: "driving",
        description: "感知-规划-控制一体化端到端神经网络架构",
        brands: { huawei: "⚠️", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "⚠️", xiaomi: "⚠️", byd: "⚠️", jiyue: "⚠️", zhiji: "⚠️", horizon: "⚠️", weride: "✅", baidu: "⚠️" },
      },
      {
        id: "l3-highway",
        name: "高速L3",
        category: "driving",
        description: "高速有条件自动驾驶(L3级)，责任由系统承担",
        brands: { huawei: "🔜", tesla: "🔜", xpeng: "🔜", lixiang: "🔜", nio: "🔜", xiaomi: "❌", byd: "🔜", jiyue: "❌", zhiji: "❌", horizon: "❌", weride: "❌", baidu: "❌" },
      },
      {
        id: "l4-urban",
        name: "城区L4",
        category: "driving",
        description: "城区高度自动驾驶(L4级)，完全无人接管",
        brands: { huawei: "🔜", tesla: "❌", xpeng: "❌", lixiang: "❌", nio: "❌", xiaomi: "❌", byd: "❌", jiyue: "❌", zhiji: "❌", horizon: "❌", weride: "✅", baidu: "⚠️" },
      },
      {
        id: "roaming",
        name: "无导航漫游",
        category: "driving",
        description: "无需设定导航目的地，车辆自主行驶",
        brands: { huawei: "⚠️", tesla: "✅", xpeng: "✅", lixiang: "❌", nio: "❌", xiaomi: "❌", byd: "❌", jiyue: "❌", zhiji: "❌", horizon: "❌", weride: "✅", baidu: "❌" },
      },
    ],
  },
  {
    id: "parking",
    name: "泊车功能",
    icon: "square-parking",
    features: [
      {
        id: "auto-parking",
        name: "自动泊车",
        category: "parking",
        description: "自动识别车位并完成泊车入位",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "✅", jiyue: "✅", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "✅" },
      },
      {
        id: "valet-parking",
        name: "代客泊车",
        category: "parking",
        description: "车辆自动驶入/驶出停车场指定区域，无需驾驶员在场",
        brands: { huawei: "✅", tesla: "❌", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "⚠️", zhiji: "⚠️", horizon: "❌", weride: "⚠️", baidu: "❌" },
      },
      {
        id: "memory-parking",
        name: "记忆泊车",
        category: "parking",
        description: "学习并记忆常用泊车路线，自动沿路线泊入",
        brands: { huawei: "✅", tesla: "❌", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "❌", zhiji: "✅", horizon: "❌", weride: "⚠️", baidu: "⚠️" },
      },
      {
        id: "remote-parking",
        name: "遥控泊车",
        category: "parking",
        description: "通过手机遥控车辆泊入/泊出狭窄车位",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "⚠️", zhiji: "✅", horizon: "✅", weride: "⚠️", baidu: "⚠️" },
      },
      {
        id: "spot-to-spot",
        name: "车位到车位",
        category: "parking",
        description: "从出发地车位到目的地车位全程自动，含停车场内行驶",
        brands: { huawei: "✅", tesla: "❌", xpeng: "⚠️", lixiang: "✅", nio: "⚠️", xiaomi: "⚠️", byd: "⚠️", jiyue: "❌", zhiji: "⚠️", horizon: "❌", weride: "❌", baidu: "❌" },
      },
    ],
  },
  {
    id: "safety",
    name: "安全功能",
    icon: "shield",
    features: [
      {
        id: "aeb",
        name: "AEB自动紧急制动",
        category: "safety",
        description: "检测前方碰撞风险自动刹车，含行人/骑行者识别",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "✅", jiyue: "✅", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "✅" },
      },
      {
        id: "eaes",
        name: "eAES紧急避让",
        category: "safety",
        description: "紧急情况下边刹边让，避让障碍物而非仅刹车",
        brands: { huawei: "✅", tesla: "⚠️", xpeng: "⚠️", lixiang: "⚠️", nio: "⚠️", xiaomi: "❌", byd: "⚠️", jiyue: "❌", zhiji: "❌", horizon: "⚠️", weride: "⚠️", baidu: "❌" },
      },
      {
        id: "vru-protection",
        name: "VRU行人保护",
        category: "safety",
        description: "识别并保护弱势道路使用者(行人/骑行者/儿童)",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "✅", jiyue: "✅", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "✅" },
      },
      {
        id: "misaccel-prevention",
        name: "误踩油门防护",
        category: "safety",
        description: "检测误踩油门操作并自动阻止加速",
        brands: { huawei: "✅", tesla: "⚠️", xpeng: "⚠️", lixiang: "⚠️", nio: "⚠️", xiaomi: "❌", byd: "⚠️", jiyue: "❌", zhiji: "❌", horizon: "✅", weride: "⚠️", baidu: "❌" },
      },
      {
        id: "rear-collision",
        name: "后向碰撞预警",
        category: "safety",
        description: "检测后方来车碰撞风险并预警/自动避险",
        brands: { huawei: "✅", tesla: "⚠️", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "⚠️", byd: "✅", jiyue: "⚠️", zhiji: "⚠️", horizon: "⚠️", weride: "✅", baidu: "⚠️" },
      },
    ],
  },
  {
    id: "sensing",
    name: "感知能力",
    icon: "eye",
    features: [
      {
        id: "bev",
        name: "BEV鸟瞰感知",
        category: "sensing",
        description: "鸟瞰图视角统一融合多摄像头感知信息",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "✅", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "✅" },
      },
      {
        id: "occ",
        name: "占用网络(OCC)",
        category: "sensing",
        description: "3D体素化占用预测，识别不规则/未知障碍物",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "⚠️", xiaomi: "⚠️", byd: "⚠️", jiyue: "✅", zhiji: "⚠️", horizon: "⚠️", weride: "⚠️", baidu: "⚠️" },
      },
      {
        id: "vlm",
        name: "视觉语言模型(VLM)",
        category: "sensing",
        description: "结合视觉和语言理解进行场景推理和决策",
        brands: { huawei: "⚠️", tesla: "⚠️", xpeng: "✅", lixiang: "✅", nio: "⚠️", xiaomi: "⚠️", byd: "⚠️", jiyue: "❌", zhiji: "⚠️", horizon: "⚠️", weride: "⚠️", baidu: "⚠️" },
      },
      {
        id: "god",
        name: "GOD通用障碍物检测",
        category: "sensing",
        description: "异形/通用障碍物检测网络，超越白名单识别",
        brands: { huawei: "✅", tesla: "⚠️", xpeng: "⚠️", lixiang: "⚠️", nio: "⚠️", xiaomi: "⚠️", byd: "⚠️", jiyue: "⚠️", zhiji: "⚠️", horizon: "⚠️", weride: "⚠️", baidu: "⚠️" },
      },
      {
        id: "lidar-perception",
        name: "激光雷达感知",
        category: "sensing",
        description: "使用激光雷达进行3D点云感知，高精度测距",
        brands: { huawei: "✅", tesla: "❌", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "✅", byd: "⚠️", jiyue: "❌", zhiji: "✅", horizon: "⚠️", weride: "✅", baidu: "⚠️" },
      },
    ],
  },
  {
    id: "architecture",
    name: "技术架构",
    icon: "cpu",
    features: [
      {
        id: "self-chip",
        name: "自研智驾芯片",
        category: "architecture",
        description: "自主研发自动驾驶AI芯片",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "❌", nio: "✅", xiaomi: "❌", byd: "✅", jiyue: "❌", zhiji: "❌", horizon: "✅", weride: "❌", baidu: "🔜" },
      },
      {
        id: "cabin-drive-fusion",
        name: "舱驾融合",
        category: "architecture",
        description: "座舱与智驾共用一颗芯片，降本增效",
        brands: { huawei: "⚠️", tesla: "⚠️", xpeng: "⚠️", lixiang: "❌", nio: "⚠️", xiaomi: "❌", byd: "⚠️", jiyue: "❌", zhiji: "❌", horizon: "✅", weride: "❌", baidu: "❌" },
      },
      {
        id: "data-closed-loop",
        name: "数据闭环",
        category: "architecture",
        description: "影子模式+数据回传+自动标注+模型迭代闭环体系",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "⚠️", byd: "⚠️", jiyue: "⚠️", zhiji: "⚠️", horizon: "⚠️", weride: "⚠️", baidu: "⚠️" },
      },
      {
        id: "cloud-training",
        name: "云端超算中心",
        category: "architecture",
        description: "自有大规模AI训练集群(≥10EFLOPS)",
        brands: { huawei: "✅", tesla: "✅", xpeng: "✅", lixiang: "✅", nio: "✅", xiaomi: "⚠️", byd: "✅", jiyue: "❌", zhiji: "⚠️", horizon: "✅", weride: "⚠️", baidu: "✅" },
      },
      {
        id: "v2x",
        name: "V2X车路协同",
        category: "architecture",
        description: "与路侧基础设施通信，获取红绿灯/路况等信息",
        brands: { huawei: "⚠️", tesla: "❌", xpeng: "❌", lixiang: "❌", nio: "⚠️", xiaomi: "❌", byd: "⚠️", jiyue: "⚠️", zhiji: "❌", horizon: "❌", weride: "⚠️", baidu: "✅" },
      },
    ],
  },
];

// OTA更新追踪数据 - 基于各品牌官方OTA公告
export interface OTAUpdate {
  id: string;
  brand: string;
  version: string;
  date: string;
  type: "新功能" | "优化" | "修复" | "安全";
  scope: string;
  highlights: string[];
  breaking?: string[];
  compatibleModels?: string[];
}

export const otaUpdates: OTAUpdate[] = [
  { id: "ota-001", brand: "huawei", version: "ADS 5.0", date: "2026-06-01", type: "新功能", scope: "核心细节发布", highlights: ["城区L4级自动驾驶", "高速L3有条件自动驾驶", "WEWA架构全面升级", "车位到车位2.0", "预计Q3全量推送"], compatibleModels: ["问界M9 Ultra"] },
  { id: "ota-002", brand: "huawei", version: "ADS 4.1", date: "2026-05-15", type: "新功能", scope: "全量推送", highlights: ["eAES智能避障(边刹边让)", "后向VRU风险预警", "一键启动领航辅助", "城市NOA覆盖近400城"], compatibleModels: ["问界M9/M7/M5", "享界S9", "智界S7"] },
  { id: "ota-003", brand: "huawei", version: "ADS 4.0", date: "2026-03-20", type: "新功能", scope: "全量推送", highlights: ["WEWA架构首发", "车位到车位1.0", "GOD 2.5升级", "复杂路口自主通行增强"], compatibleModels: ["问界M9/M7/M5"] },
  { id: "ota-004", brand: "tesla", version: "FSD V14(中国版)", date: "2026-05-21", type: "新功能", scope: "灰度推送", highlights: ["FSD Supervised正式入华", "当前功能缩减版", "满血V14预计Q3推送"], breaking: ["中国版功能少于海外版"], compatibleModels: ["Model 3/Y (HW4.0)"] },
  { id: "ota-005", brand: "tesla", version: "FSD V14.3", date: "2026-04-01", type: "新功能", scope: "海外推送", highlights: ["自回归Transformer架构", "3-5秒时空记忆", "神经网络全面重构"], compatibleModels: ["Model 3/Y/S/X (HW4.0)"] },
  { id: "ota-006", brand: "xpeng", version: "XNGP 6.2.0", date: "2026-05-31", type: "新功能", scope: "全量推送", highlights: ["VLA 2.0端到端视觉-动作直连", "决策延迟降至80ms", "无导航NGP漫游", "P挡直接启动NGP"], compatibleModels: ["P7+ Ultra SE", "G6/G9 Max"] },
  { id: "ota-007", brand: "xpeng", version: "天玑AI OS 6.1.0", date: "2026-04-04", type: "新功能", scope: "全量推送", highlights: ["全新AI交互体验", "自研图灵芯片2250TOPS", "XNGP能力全面升级"], compatibleModels: ["P7+/G6/G9/X9 Max"] },
  { id: "ota-008", brand: "lixiang", version: "AD Max V13", date: "2026-03-15", type: "新功能", scope: "全量推送", highlights: ["1000万Clips模型", "VLA司机大模型+强化学习", "AD Pro首次获城市NOA", "VLA充电功能"], compatibleModels: ["L9/L8/L7/L6/MEGA AD Max", "L7/L8/L9 AD Pro"] },
  { id: "ota-009", brand: "lixiang", version: "OTA 8.2", date: "2026-01-21", type: "优化", scope: "全量推送", highlights: ["ETC自动通过稳定性提升", "高速NOA舒适性优化"], compatibleModels: ["全系"] },
  { id: "ota-010", brand: "nio", version: "Cedar雪松系统", date: "2026-04-20", type: "新功能", scope: "ES9首发", highlights: ["神玑5nm智驾芯片首发", "AQUILA天鹰座超感系统", "全域NOP+升级"], compatibleModels: ["ET9 Cedar版"] },
  { id: "ota-011", brand: "nio", version: "NOP+ 5.0", date: "2026-02-15", type: "新功能", scope: "全量推送", highlights: ["群体智能路线共享", "城区NOP+新增40城", "代客泊车功能"], compatibleModels: ["ES6/EC7/ET5/ES8"] },
  { id: "ota-012", brand: "xiaomi", version: "Pilot 1.16", date: "2026-05-13", type: "新功能", scope: "全量推送", highlights: ["XLA架构+世界模型", "全域车道级导航101城", "语音控车Beta", "收费站通行辅助"], compatibleModels: ["SU7 Ultra/Max (2026款)"] },
  { id: "ota-013", brand: "byd", version: "天神之眼5.0", date: "2026-05-28", type: "新功能", scope: "灰度推送", highlights: ["自研璇玑A3 4nm芯片", "城市领航+智能泊车安全兜底", "B激光版1.2万可选装"], compatibleModels: ["汉L/唐L 天神之眼B"] },
  { id: "ota-014", brand: "horizon", version: "HSD V1.6", date: "2026-04-22", type: "新功能", scope: "正式发布", highlights: ["巡航跟车舒适性大幅提升", "路口动态博弈增强", "遥控泊车+离车泊入", "误踩油门防护/倒车紧急制动"], compatibleModels: ["iCAR V27 (HSD版)"] },
  { id: "ota-015", brand: "horizon", version: "HSD V1.5 OTA", date: "2026-02-12", type: "优化", scope: "全量推送", highlights: ["量产首次OTA升级", "行车质感优化", "泊车效率提升"], compatibleModels: ["iCAR V27 (HSD版)"] },
  { id: "ota-016", brand: "horizon", version: "星空6P发布", date: "2026-04-22", type: "新功能", scope: "发布即量产", highlights: ["中国首款5nm舱驾融合芯片", "650TOPS+273GB/s带宽", "单车省1500-4000元"], compatibleModels: ["Q3量产多款合作车型"] },
  { id: "ota-017", brand: "weride", version: "Ride 6.0", date: "2026-05-20", type: "新功能", scope: "三城运营", highlights: ["L4级Robotaxi三城运营", "0接管率99.2%", "日均2000+订单"], compatibleModels: ["Robotaxi (SS 5.0套件)"] },
  { id: "ota-018", brand: "baidu", version: "Apollo 8.0", date: "2026-05-18", type: "新功能", scope: "正式发布", highlights: ["端到端大模型架构升级", "纯视觉城市NOA 120城", "V2X车路协同扩展"], compatibleModels: ["极越01", "岚图梦想家"] },
  { id: "ota-019", brand: "jiyue", version: "PPA V1.5.0", date: "2026-04-10", type: "优化", scope: "全量推送", highlights: ["100城覆盖", "纯视觉感知优化", "自动泊车速度提升"], compatibleModels: ["极越01"] },
  { id: "ota-020", brand: "zhiji", version: "IM AD 3.0", date: "2026-05-01", type: "新功能", scope: "全量推送", highlights: ["端到端大模型", "520线激光雷达全系标配", "无图NOA全国"], compatibleModels: ["LS6 (2026款)"] },
];

// 法规标准数据 - 基于官方发布文件
export interface Regulation {
  id: string;
  code: string;
  name: string;
  organization: string;
  category: "国际标准" | "国标" | "行标" | "法规";
  level: "L0" | "L1" | "L2" | "L3" | "L4" | "L5" | "通用";
  year: string;
  status: "现行" | "征求意见" | "制定中" | "已废止";
  summary: string;
  keyPoints: string[];
  relatedStandards?: string[];
}

export const regulations: Regulation[] = [
  {
    id: "reg-001", code: "SAE J3016", name: "驾驶自动化分级标准", organization: "SAE International", category: "国际标准", level: "通用", year: "2021(修订)", status: "现行",
    summary: "定义了L0-L5六个驾驶自动化等级，是全球自动驾驶分级的事实标准。",
    keyPoints: ["L0无自动化-驾驶员全程操控", "L1驾驶辅助-单一功能辅助(ACC/LKA)", "L2部分自动驾驶-同时控制横向+纵向", "L3有条件自动驾驶-系统负责但驾驶员须接管", "L4高度自动驾驶-系统全权负责(限定ODD)", "L5完全自动驾驶-全场景无人驾驶"],
    relatedStandards: ["GB/T 40429-2021"],
  },
  {
    id: "reg-002", code: "GB/T 40429-2021", name: "汽车驾驶自动化分级", organization: "国家标准委", category: "国标", level: "通用", year: "2021", status: "现行",
    summary: "中国版驾驶自动化分级国家标准，与SAE J3016对齐，定义L0-L5等级。",
    keyPoints: ["与SAE J3016等级对应", "增加中国特色场景描述", "明确各等级动态驾驶任务(DDT)责任", "定义ODD(运行设计域)概念"],
    relatedStandards: ["SAE J3016"],
  },
  {
    id: "reg-003", code: "GB/T 43674-2024", name: "智能网联汽车运行安全测试规范", organization: "国家标准委", category: "国标", level: "通用", year: "2024", status: "现行",
    summary: "规范智能网联汽车运行安全测试的方法、要求和流程。",
    keyPoints: ["定义运行安全测试项目", "明确测试道路/场景要求", "规定数据记录与回传标准", "建立测试评价体系"],
  },
  {
    id: "reg-004", code: "工信部L3准入许可", name: "智能网联汽车准入和上路通行试点", organization: "工信部/公安部/住建部/交通运输部", category: "法规", level: "L3", year: "2023-2025", status: "现行",
    summary: "中国首批L3级智能网联汽车准入许可，2025年12月公布首批通过车型。",
    keyPoints: ["L3级自动驾驶准入条件", "使用主体责任界定", "试点城市/区域限定", "安全员/数据记录要求", "2025.12首批9家车企获准(含华为系/比亚迪等)", "交通事故责任由使用主体承担"],
    relatedStandards: ["GB/T 40429-2021", "GB/T 43674-2024"],
  },
  {
    id: "reg-005", code: "ISO 21434", name: "道路车辆网络安全工程", organization: "ISO", category: "国际标准", level: "通用", year: "2021", status: "现行",
    summary: "定义汽车网络安全工程全生命周期要求，涵盖风险评估、安全设计、验证等。",
    keyPoints: ["网络安全风险管理流程", "安全概念与设计要求", "供应链安全要求", "持续网络安全活动"],
    relatedStandards: ["UN R155", "GB 44495-2024"],
  },
  {
    id: "reg-006", code: "ISO 26262", name: "道路车辆功能安全", organization: "ISO", category: "国际标准", level: "通用", year: "2018(2版)", status: "现行",
    summary: "汽车电子电气系统功能安全国际标准，定义ASIL等级和安全生命周期。",
    keyPoints: ["ASIL A/B/C/D安全等级", "危害分析与风险评估(HARA)", "安全目标与安全需求", "功能安全验证与确认", "自动驾驶系统需满足ASIL D"],
    relatedStandards: ["ISO 21448", "ISO 21434"],
  },
  {
    id: "reg-007", code: "ISO 21448 (SOTIF)", name: "预期功能安全", organization: "ISO", category: "国际标准", level: "通用", year: "2022", status: "现行",
    summary: "针对自动驾驶系统在非故障情况下因性能局限导致的安全问题(SOTIF)。",
    keyPoints: ["识别功能性能局限", "触发条件分析", "已知/未知场景分类", "验证与确认策略", "与ISO 26262互补(功能安全vs预期功能安全)"],
    relatedStandards: ["ISO 26262"],
  },
  {
    id: "reg-008", code: "UN R155", name: "联合国车辆网络安全法规", organization: "UNECE", category: "国际标准", level: "通用", year: "2021", status: "现行",
    summary: "联合国车辆网络安全统一法规，要求车辆型式认证必须满足网络安全要求。",
    keyPoints: ["车辆网络安全管理体系(CSMS)", "型式认证网络安全要求", "供应链安全审计", "2024年7月起强制实施(新车型)"],
    relatedStandards: ["ISO 21434", "UN R156"],
  },
  {
    id: "reg-009", code: "UN R157", name: "自动车道保持系统(ALKS)法规", organization: "UNECE", category: "国际标准", level: "L3", year: "2021", status: "现行",
    summary: "全球首个L3级自动驾驶法规，规范自动车道保持系统的技术要求。",
    keyPoints: ["限速60km/h(L3级ALKS)", "驾驶员接管请求(10s过渡期)", "数据存储系统(DSSAD)", "ODD限定条件", "2023年修订提升至130km/h"],
    relatedStandards: ["SAE J3016"],
  },
  {
    id: "reg-010", code: "GB 44495-2024", name: "智能网联汽车信息安全技术要求", organization: "国家标准委", category: "国标", level: "通用", year: "2024", status: "现行",
    summary: "中国智能网联汽车信息安全国家标准，规定车载网络安全技术要求。",
    keyPoints: ["车载网络通信安全", "数据加密与认证", "远程升级安全要求", "个人信息保护"],
    relatedStandards: ["ISO 21434", "UN R155"],
  },
  {
    id: "reg-011", code: "深圳经济特区智能网联汽车管理条例", name: "首部L3自动驾驶地方法规", organization: "深圳市人大", category: "法规", level: "L3", year: "2022", status: "现行",
    summary: "中国首部智能网联汽车管理地方性法规，明确L3级事故责任划分。",
    keyPoints: ["有驾驶人时由驾驶人担责", "无驾驶人时由车辆所有人/管理人担责", "完全自动驾驶可免除驾驶人", "测试/示范应用管理规范"],
    relatedStandards: ["GB/T 40429-2021"],
  },
  {
    id: "reg-012", code: "GB/T 43596-2023", name: "智能网联汽车OTA安全技术要求", organization: "国家标准委", category: "国标", level: "通用", year: "2023", status: "现行",
    summary: "规范智能网联汽车OTA升级的安全技术要求和测试方法。",
    keyPoints: ["OTA升级安全流程", "版本管理与回滚机制", "升级包完整性校验", "用户告知与同意要求"],
  },
  {
    id: "reg-013", code: "GB/T 39265-2020", name: "道路车辆功能安全", organization: "国家标准委", category: "国标", level: "通用", year: "2020", status: "现行",
    summary: "中国版道路车辆功能安全国家标准，等同采用ISO 26262:2018。",
    keyPoints: ["等同ISO 26262:2018", "ASIL等级体系", "功能安全全生命周期管理"],
    relatedStandards: ["ISO 26262"],
  },
  {
    id: "reg-014", code: "Euro NCAP AEB协议", name: "欧洲新车评估AEB测试规程", organization: "Euro NCAP", category: "国际标准", level: "L1", year: "2023(更新)", status: "现行",
    summary: "Euro NCAP自动紧急制动测试规程，是AEB功能的权威评估标准。",
    keyPoints: ["车对车AEB测试场景", "车对行人/骑行者测试", "夜间AEB测试要求", "2023年新增摩托车/交叉路口场景", "2025年将纳入ADAS评分体系"],
  },
  {
    id: "reg-015", code: "GB/T 40429-2021应用指南", name: "自动驾驶分级应用指南", organization: "工信部", category: "行标", level: "通用", year: "2024", status: "征求意见",
    summary: "针对GB/T 40429-2021的详细应用指南，明确各等级边界和测试方法。",
    keyPoints: ["L2/L3边界界定细则", "ODD描述规范", "系统备份与降级策略", "人机交互要求"],
    relatedStandards: ["GB/T 40429-2021", "SAE J3016"],
  },
];

// 收藏夹存储 Key
export const FAVORITES_STORAGE_KEY = "autodrive-favorites";

export interface FavoriteItem {
  id: string;
  type: "feed" | "scheme" | "version" | "test" | "term" | "regulation" | "ota";
  title: string;
  subtitle?: string;
  url: string;
  savedAt: string;
}
