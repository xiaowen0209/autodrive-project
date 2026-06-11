// 智能驾驶研究台 - 2026年最新行业数据

export type BrandKey = "huawei" | "tesla" | "xpeng" | "lixiang" | "nio" | "xiaomi" | "byd" | "jiyue" | "zhiji" | "horizon" | "weride" | "baidu";

export const brandConfig: Record<string, { name: string; color: string; icon: string }> = {
  huawei: { name: "华为ADS", color: "#CF0A2C", icon: "H" },
  tesla: { name: "特斯拉FSD", color: "#CC0000", icon: "T" },
  xpeng: { name: "小鹏XNGP", color: "#00B4AA", icon: "X" },
  lixiang: { name: "理想AD Max", color: "#4A6CF7", icon: "L" },
  nio: { name: "蔚来NOP+", color: "#00BFFF", icon: "N" },
  xiaomi: { name: "小米智驾", color: "#FF6900", icon: "Mi" },
  byd: { name: "比亚迪天神之眼", color: "#C50000", icon: "BYD" },
  jiyue: { name: "极越PPA", color: "#6C5CE7", icon: "JY" },
  zhiji: { name: "智己IM AD", color: "#8B5CF6", icon: "ZJ" },
  horizon: { name: "地平线HSD", color: "#E63946", icon: "HX" },
  weride: { name: "文远知行WeRide", color: "#2EC4B6", icon: "WR" },
  baidu: { name: "百度Apollo", color: "#306CFE", icon: "BD" },
};

// 统计概览
export const stats = {
  schemeCount: 52,
  schemeTrend: 18,
  versionCount: 31,
  versionTrend: 24,
  testCount: 289,
  testTrend: 35,
  brandCount: 21,
  brandTrend: 5,
};

// 首页动态Feed
export const feedItems = [
  { id: 1, date: "2026-06-01", brand: "huawei" as BrandKey, title: "华为ADS 5.0城区L4/高速L3核心细节发布", summary: "ADS 5.0正式发布核心架构细节，城区实现L4级自动驾驶，高速支持L3有条件自动驾驶，WEWA架构全面升级，预计Q3全量推送。", tags: ["OTA", "新功能"] },
  { id: 2, date: "2026-05-28", brand: "byd" as BrandKey, title: "比亚迪天神之眼5.0正式发布", summary: "天神之眼5.0发布，搭载自研4nm璇玑A3芯片(254TOPS/颗)，城市领航+智能泊车双场景安全兜底，B激光版1.2万元可选装。", tags: ["OTA", "新功能"] },
  { id: 3, date: "2026-05-21", brand: "tesla" as BrandKey, title: "特斯拉FSD Supervised正式入华", summary: "FSD Supervised 5月21日正式在中国市场推送，当前版本为2024.45.32.12功能缩减版，满血V14版本预计Q3全面推送。", tags: ["OTA", "实测"] },
  { id: 4, date: "2026-05-31", brand: "xpeng" as BrandKey, title: "小鹏OTA 6.2.0推送 VLA 2.0架构上线", summary: "XNGP OTA 6.2.0开始推送，搭载VLA 2.0端到端视觉-动作直连架构，决策延迟降至80ms，支持无导航NGP漫游和P挡启动。", tags: ["OTA", "新功能"] },
  { id: 5, date: "2026-05-15", brand: "huawei" as BrandKey, title: "华为ADS 4.1推送 eAES智能避障上线", summary: "ADS 4.1版本推送，新增eAES智能避障(边刹边让)、后向VRU风险预警、一键启动领航辅助，城市NOA覆盖近400城。", tags: ["OTA", "优化"] },
  { id: 6, date: "2026-05-13", brand: "xiaomi" as BrandKey, title: "小米OTA 1.16推送 XLA架构+世界模型", summary: "小米智驾OTA 1.16推送，引入XLA架构与世界模型，全域车道级导航Beta覆盖101城，新增语音控车Beta和收费站通行辅助。", tags: ["OTA", "新功能"] },
  { id: 7, date: "2026-04-04", brand: "xpeng" as BrandKey, title: "小鹏天玑AI OS 6.1.0全量推送", summary: "天玑AI OS 6.1.0全量推送，全新AI交互体验，自研图灵芯片算力2250TOPS，XNGP能力全面升级。", tags: ["OTA", "新功能"] },
  { id: 8, date: "2026-04-01", brand: "tesla" as BrandKey, title: "特斯拉FSD V14.3大范围推送", summary: "FSD V14.3开始海外大范围推送，神经网络架构全面重构，采用自回归Transformer，3-5秒时空记忆能力，HW4.0适配完成。", tags: ["OTA", "新功能"] },
  { id: 9, date: "2026-03-15", brand: "lixiang" as BrandKey, title: "理想AD Max V13全量推送 1000万Clips模型", summary: "AD Max V13全量推送，搭载1000万Clips训练大模型，VLA司机大模型+行为强化学习，VLA充电功能上线，AD Pro首次获城市NOA。", tags: ["OTA", "新功能"] },
  { id: 10, date: "2026-01-21", brand: "lixiang" as BrandKey, title: "理想OTA 8.2推送", summary: "OTA 8.2版本推送，AD Max多项功能优化，VLA司机大模型持续进化，ETC自动通过稳定性提升。", tags: ["OTA", "优化"] },
  { id: 11, date: "2026-06-03", brand: "horizon" as BrandKey, title: "高盛维持地平线买入评级 HSD V2.0计划Q3发布", summary: "高盛发布研报维持地平线买入评级，目标价13.14元。预期HSD V2.0将于Q3发布，安全水平/泊车/驾驶体验全面升级，升级后HSD平台将推动J6P芯片采用率上升，征程6系列在新能源车型持续放量。", tags: ["行业", "新功能"] },
  { id: 11.5, date: "2026-06-02", brand: "horizon" as BrandKey, title: "地平线HSD实测：等红灯选最快车道 违停果断绕行", summary: "iCAR V27搭载J6P实测北京望京，HSD展现极高驾驶智商：灵活人车博弈、预判绕行违停车辆(含识别公交车双闪提前绕行)、多岔路口正确选道、等红绿灯选择车最少车道。一段式端到端+强化学习+VLM，系统响应时延百毫秒级，比人类快42%。", tags: ["实测", "新功能"] },
  { id: 11.6, date: "2026-05-28", brand: "horizon" as BrandKey, title: "地平线HSD Together模式：模型蒸馏实现技术普惠", summary: "地平线与neueHCT(智驾新程)深度对话：HSD Together核心是通过模型裁剪蒸馏技术，让不同算力平台共享高阶技术红利。征程6M算力仍有充足冗余持续迭代，10万级城区NOA赛道核心壁垒是低价普惠+体验不降级。全球化方面2026年将完成欧洲/东南亚/澳新/中东量产落地。", tags: ["行业", "新功能"] },
  { id: 11.7, date: "2026-05-30", brand: "horizon" as BrandKey, title: "比亚迪自研芯片后与地平线合作反而在深化", summary: "分析指出比亚迪自研芯片对地平线短期阵痛长期利好：星空6P已获比亚迪正式意向合作(首款车型Q4落地)，'迪迪虾'与'咖咖虾'架构高度一致获底层技术支持，BPU IP授权合作洽谈中。星空芯片是目前国内唯一量产5nm舱驾融合芯片，单车可省1500-4000元内存成本。", tags: ["行业", "新功能"] },
  { id: 11.8, date: "2026-04-22", brand: "horizon" as BrandKey, title: "地平线年度发布会：星空6P芯片+KaKaClaw OS+HSD V1.6三连发", summary: "地平线2026年度发布会重磅发布三款产品：中国首款舱驾融合芯片星空Starry 6P(5nm/650TOPS/273GB/s带宽)、整车智能体OS KaKaClaw咖咖虾(理解-决策-执行-记忆-进化闭环)、HSD V1.6(新增遥控泊车/离车泊入/起步提醒/倒车紧急制动/误踩油门防护)。星空6P获10余家OEM及博世/电装等Tier1意向，iCAR V27全球首发。", tags: ["OTA", "新功能"] },
  { id: 11.9, date: "2026-04-13", brand: "horizon" as BrandKey, title: "地平线预告发布中国首个舱驾融合智能体芯片方案", summary: "地平线官宣将发布中国首个舱驾融合整车智能体芯片方案，打破'一个功能匹配一颗芯片'的多脑结构，开启舱驾融合规模化量产新阶段。征程系列已跨越1000万量产出货大关，每三台智能汽车就有一台搭载地平线。", tags: ["行业", "新功能"] },
  { id: 11.1, date: "2026-02-12", brand: "horizon" as BrandKey, title: "地平线HSD首次OTA升级 V1.5版本多项优化", summary: "HSD V1.5推送量产首次OTA，优化辅助驾驶行车质感、泊车效率、环境感知精度及人机交互体验，新增多项实用功能，标志着HSD系统持续迭代迈向成熟。", tags: ["OTA", "优化"] },
  { id: 12, date: "2026-05-20", brand: "weride" as BrandKey, title: "文远知行Ride 6.0发布 L4级Robotaxi规模运营", summary: "WeRide Ride 6.0方案发布，L4级自动驾驶Robotaxi在广州/北京/深圳三城规模运营，日均订单超2000单，全场景0接管率99.2%。", tags: ["新功能", "实测"] },
  { id: 13, date: "2026-05-18", brand: "baidu" as BrandKey, title: "百度Apollo 8.0发布 ASD方案搭载极越/岚图", summary: "Apollo 8.0正式发布，端到端大模型架构升级，ASD方案已搭载极越/岚图等车型，纯视觉城市NOA覆盖120城，V2X车路协同扩展。", tags: ["OTA", "新功能"] },
  { id: 14, date: "2026-04-10", brand: "horizon" as BrandKey, title: "地平线征程6E量产上车 首批车型交付", summary: "征程6E芯片(128TOPS)首批量产车型交付，支持高速NOA+自动泊车，已获比亚迪/奇瑞/一汽等8家车企定点，2026年预计出货超200万片。", tags: ["OTA", "新功能"] },
];

// 车型传感器配置（仅收录官方参数页/公告数据，非官方数据不录入）
export type DataSource = "官方";

export interface VehicleModel {
  name: string;           // 车型名称
  year: string;           // 年款
  cameras: number;        // 摄像头数量
  cameraDetail?: string;  // 摄像头规格说明
  lidarCount: number;     // 激光雷达数量
  lidarDetail?: string;   // 激光雷达规格说明
  mmwaveCount: number;    // 毫米波雷达数量
  mmwaveDetail?: string;  // 毫米波雷达规格说明
  ultrasonicCount: number;// 超声波雷达数量
  chipDetail?: string;    // 芯片配置说明
  topsActual?: number;    // 该车型实际算力(TOPS)
  source: DataSource;     // 数据来源
  sourceUrl?: string;     // 来源链接
}

// 方案对比数据
export const compareSchemes = [
  {
    brand: "huawei" as BrandKey,
    version: "ADS 5.0",
    chip: "昇腾610 / 自研MDC 810",
    tops: 580,
    lidar: "1× 896线双光路/6颗(M9 Ultra)",
    cameras: 13,
    radar: "5× 毫米波(含4D成像)",
    perception: "多模态融合+GOD 3.0+端到端大模型",
    planning: "WEWA 2.0架构+L3双域融合",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 9.5, laneChange: 9.6, leftTurn: 9.2, construction: 9.0, parking: 9.1 },
    pros: ["城区L4级自动驾驶，行业最前", "896线双光路激光雷达线数跃升4.7倍", "WEWA 2.0架构+60EFLOPS云端算力", "L3双域融合架构200ms紧急响应", "170万辆搭载/109亿公里行业最大规模"],
    cons: ["ADS 5.0仅Ultra版本支持", "施工路段eAES偶发减速过猛", "窄道会车能力弱于小鹏VLA 2.0", "高阶功能依赖高配车型"],
    models: [
      { name: "问界M9 Ultra", year: "2026", cameras: 13, cameraDetail: "4×800万侧视+4×800万环视+1×800万前视+4×200万补盲", lidarCount: 6, lidarDetail: "1×896线双光路(顶) + 2×96线(翼) + 2×补盲 + 1×后向", mmwaveCount: 5, mmwaveDetail: "含4D成像雷达", ultrasonicCount: 12, chipDetail: "MDC 810", topsActual: 580, source: "官方" },
      { name: "问界M9", year: "2026", cameras: 13, cameraDetail: "4×800万侧视+4×800万环视+1×800万前视+4×200万补盲", lidarCount: 3, lidarDetail: "1×896线双光路(顶) + 2×补盲", mmwaveCount: 5, mmwaveDetail: "含4D成像雷达", ultrasonicCount: 12, chipDetail: "MDC 810", topsActual: 580, source: "官方" },
      { name: "享界S9", year: "2026", cameras: 11, cameraDetail: "4×800万侧视+4×800万环视+1×800万前视+2×200万补盲", lidarCount: 1, lidarDetail: "1×896线双光路(顶)", mmwaveCount: 5, mmwaveDetail: "含4D成像雷达", ultrasonicCount: 12, chipDetail: "昇腾610", topsActual: 580, source: "官方" },
      { name: "问界M7", year: "2025", cameras: 11, cameraDetail: "4×800万侧视+4×800万环视+1×800万前视+2×200万补盲", lidarCount: 1, lidarDetail: "1×192线(顶)", mmwaveCount: 3, ultrasonicCount: 12, chipDetail: "MDC 610", topsActual: 200, source: "官方" },

    ] as VehicleModel[],
  },
  {
    brand: "tesla" as BrandKey,
    version: "FSD V14.3.3",
    chip: "双FSD Chip 2 (HW4.0)",
    tops: 720,
    lidar: "无",
    cameras: 11,
    radar: "4D毫米波'凤凰'(6T8R)",
    perception: "纯视觉+4D毫米波(自回归Transformer)",
    planning: "端到端神经网络",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: false,
    memoryParking: false,
    scores: { intersection: 9.1, laneChange: 9.4, leftTurn: 8.8, construction: 8.2, parking: 7.8 },
    pros: ["自回归Transformer架构，3-5秒时空记忆", "V14决策延迟95ms较前代大幅降低", "新增4D毫米波雷达'凤凰'补足感知", "11个500万像素摄像头感知升级", "HW3.0免费升级HW4.0计划"],
    cons: ["中国版当前仍为功能缩减版", "4D毫米波雷达中国版未同步", "泊车能力明显弱于国内方案", "无保护左转通过率偏低(82%)"],
    models: [
      { name: "Model Y (HW4.0)", year: "2025+", cameras: 11, cameraDetail: "7×500万(IMX490) + 4×前向侧向", lidarCount: 0, mmwaveCount: 1, mmwaveDetail: "4D毫米波'凤凰'(6T8R)", ultrasonicCount: 0, chipDetail: "双FSD Chip 2 (HW4.0)", topsActual: 720, source: "官方" },
      { name: "Model 3 Highland (HW4.0)", year: "2025+", cameras: 11, cameraDetail: "7×500万(IMX490) + 4×前向侧向", lidarCount: 0, mmwaveCount: 1, mmwaveDetail: "4D毫米波'凤凰'(6T8R)", ultrasonicCount: 0, chipDetail: "双FSD Chip 2 (HW4.0)", topsActual: 720, source: "官方" },

      { name: "Model 3/Y (HW3.0)", year: "2024及以前", cameras: 8, lidarCount: 0, mmwaveCount: 0, ultrasonicCount: 0, chipDetail: "FSD Chip (HW3.0)", topsActual: 144, source: "官方" },
    ] as VehicleModel[],
  },
  {
    brand: "xpeng" as BrandKey,
    version: "XNGP 6.2 (VLA 2.0)",
    chip: "自研图灵AI芯片",
    tops: 2250,
    lidar: "2× 96线(选配/部分车型)",
    cameras: 12,
    radar: "5× 毫米波",
    perception: "端到端视觉-动作直连(VLA 2.0)",
    planning: "视觉-动作直连(去语言翻译环节)",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 9.0, laneChange: 9.3, leftTurn: 8.7, construction: 8.5, parking: 9.6 },
    pros: ["图灵芯片单颗2250-3000TOPS=10颗Orin-X", "VLA 2.0决策延迟仅80ms行业最快", "去掉语言翻译环节端到端直连", "50PB训练数据/4万亿Tokens行业最大", "算力利用率82.5%推理效率提升12倍"],
    cons: ["图灵芯片仅Ultra SE等高配搭载", "感知网络偶有误检幽灵刹车", "品牌波动影响用户信心", "入门版VLA 2.0功能有取舍"],
    models: [
      { name: "P7+ Ultra SE", year: "2026", cameras: 12, cameraDetail: "2×800万前视+4×800万侧视+4×300万环视+2×200万后向", lidarCount: 2, lidarDetail: "2×96线(前向)", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "自研图灵AI芯片", topsActual: 2250, source: "官方" },
      { name: "G6 Max", year: "2026", cameras: 12, lidarCount: 2, lidarDetail: "2×96线", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },
      { name: "X9 Max", year: "2026", cameras: 12, lidarCount: 2, lidarDetail: "2×96线", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },

      { name: "MONA M03 Max", year: "2026", cameras: 11, lidarCount: 0, mmwaveCount: 3, ultrasonicCount: 12, chipDetail: "单Orin-X", topsActual: 254, source: "官方" },
    ] as VehicleModel[],
  },
  {
    brand: "lixiang" as BrandKey,
    version: "AD Max V13",
    chip: "双Orin-X",
    tops: 508,
    lidar: "1× 128线(新车型禾赛ATL 116线)",
    cameras: 11,
    radar: "5× 毫米波(含4D)",
    perception: "多模态融合+One Model端到端",
    planning: "VLA司机大模型+VLM双系统",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 8.6, laneChange: 9.2, leftTurn: 8.3, construction: 8.0, parking: 9.0 },
    pros: ["800万Clips训练数据规模领先", "One Model+VLM双系统架构创新", "6×800万+5×200万摄像头感知最强", "车位到车位功能全场景覆盖", "AD Pro首次获得城市NOA能力"],
    cons: ["城区复杂路口仍弱于华为/小鹏", "VLA架构推进速度晚于竞品", "环岛通行能力待提升", "AD Pro城市NOA覆盖有限"],
    models: [
      { name: "L9 AD Max", year: "2026", cameras: 11, cameraDetail: "6×800万+5×200万", lidarCount: 1, lidarDetail: "1×128线(禾赛AT128)", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },
      { name: "L8 AD Max", year: "2026", cameras: 11, cameraDetail: "6×800万+5×200万", lidarCount: 1, lidarDetail: "1×128线", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },
      { name: "L7 AD Max", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "1×128线", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },

      { name: "L6 AD Max", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "1×128线", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },
      { name: "L7/L8/L9 AD Pro", year: "2026", cameras: 7, lidarCount: 0, mmwaveCount: 3, ultrasonicCount: 12, chipDetail: "单Orin-X", topsActual: 254, source: "官方" },
    ] as VehicleModel[],
  },
  {
    brand: "nio" as BrandKey,
    version: "NOP+ Cedar (NAD 2.0)",
    chip: "4× Orin-X / 天玑NX9031 5nm",
    tops: 1016,
    lidar: "3× 128线(Cedar)+4D成像雷达",
    cameras: 29,
    radar: "5× 毫米波(含4D成像)",
    perception: "多模态融合+AQUILA超感+NAD 2.0",
    planning: "端到端算法+群体智能数据闭环",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 8.5, laneChange: 9.0, leftTurn: 8.1, construction: 8.2, parking: 8.5 },
    pros: ["天玑NX9031 5nm单颗性能≈4颗Orin旗舰", "3×128线激光雷达+4D成像雷达感知极强", "NAD Arch2.0端到端+群体智能数据闭环", "全域NOP+(高速+城区+泊车+换电领航)", "模型迭代速度提升30%以上"],
    cons: ["天玑芯片仅Cedar新车型搭载", "老车型4×Orin-X算力利用率仍待优化", "城区场景博弈能力需追赶小鹏", "订阅制收费用户接受度不一"],
    models: [
      { name: "ET9 (Cedar版)", year: "2026", cameras: 12, cameraDetail: "7×800万+5×200万", lidarCount: 3, lidarDetail: "1×128线(顶)+2×128线(侧)", mmwaveCount: 6, mmwaveDetail: "含4D成像雷达Cedar", ultrasonicCount: 12, chipDetail: "天玑NX9031 5nm", topsActual: 1016, source: "官方" },
      { name: "ES6 (2026款)", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "1×128线(顶)", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "4×Orin-X", topsActual: 1016, source: "官方" },
      { name: "EC7 (2026款)", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "1×128线(顶)", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "4×Orin-X", topsActual: 1016, source: "官方" },

    ] as VehicleModel[],
  },
  {
    brand: "xiaomi" as BrandKey,
    version: "HAD (XLA+Thor)",
    chip: "英伟达Thor-U",
    tops: 700,
    lidar: "1× 禾赛激光雷达",
    cameras: 11,
    radar: "1× 4D毫米波+3× 毫米波",
    perception: "多模态融合+XLA认知大模型",
    planning: "XLA架构+世界模型推理",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 8.2, laneChange: 8.6, leftTurn: 7.9, construction: 8.0, parking: 8.3 },
    pros: ["2026款全系标配Thor-U+激光雷达+4D毫米波", "700TOPS算力入门即顶配智驾平权", "XLA认知大模型+1000万Clips训练", "纵向舒适度提升57%绕行成功率+67%", "城市NOA全国覆盖+车位到车位"],
    cons: ["世界模型成熟度仍需验证", "无保护右转存在犹豫", "记忆泊车精度待提升", "SU7 2024款算力仅508/84TOPS差距大"],
    models: [
      { name: "SU7 Ultra (2026款)", year: "2026", cameras: 12, cameraDetail: "4×800万侧视+4×300万环视+1×800万前视+3×200万", lidarCount: 1, lidarDetail: "1×禾赛AT128(顶)", mmwaveCount: 5, mmwaveDetail: "含4D毫米波", ultrasonicCount: 12, chipDetail: "Thor-U", topsActual: 700, source: "官方" },
      { name: "SU7 Max (2026款)", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "1×禾赛AT128(顶)", mmwaveCount: 4, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },

      { name: "SU7 标准版", year: "2024", cameras: 7, lidarCount: 0, mmwaveCount: 3, ultrasonicCount: 12, chipDetail: "84TOPS", topsActual: 84, source: "官方" },

    ] as VehicleModel[],
  },
  {
    brand: "byd" as BrandKey,
    version: "天神之眼5.0",
    chip: "自研璇玑A3 4nm×3",
    tops: 2100,
    lidar: "1× 超千线(自动驾驶版)/常规版选配",
    cameras: 12,
    radar: "4D毫米波(400m/6000点)+毫米波",
    perception: "多模态融合+物理AI大模型",
    planning: "端到端大模型+无图CNOA",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 8.3, laneChange: 8.0, leftTurn: 7.8, construction: 8.1, parking: 8.5 },
    pros: ["自研4nm璇玑A3芯片3颗协同2100+TOPS", "全球唯一芯片全链路自研车企", "天神之眼B激光版全系1.2万可选装", "400万辆智驾搭载量中国第一", "城市领航安全兜底赔付承诺"],
    cons: ["城市领航变道时机偏保守", "天神之眼C纯视觉城市NOA尚未落地", "1年兜底政策期限引发关注", "璇玑A3算力利用率仍需实测验证"],
    models: [

      { name: "汉L 天神之眼B", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "1×超千线(顶)", mmwaveCount: 5, mmwaveDetail: "含4D成像", ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },
      { name: "唐L 天神之眼B", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "1×超千线(顶)", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },

      { name: "秦L 天神之眼C", year: "2026", cameras: 7, lidarCount: 0, mmwaveCount: 3, ultrasonicCount: 8, chipDetail: "地平线征程6E", topsActual: 128, source: "官方" },
    ] as VehicleModel[],
  },
  {
    brand: "jiyue" as BrandKey,
    version: "ROBO Drive Max (PPA)",
    chip: "双NVIDIA Orin",
    tops: 508,
    lidar: "无(纯视觉)",
    cameras: 11,
    radar: "5× 毫米波",
    perception: "纯视觉(BEV+Transformer+OCC)",
    planning: "百度Apollo端到端+OCC占用网络",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: false,
    scores: { intersection: 7.5, laneChange: 7.8, leftTurn: 7.2, construction: 7.0, parking: 7.5 },
    pros: ["纯视觉方案BOM成本极低", "百度Apollo L4级安全体系赋能", "OCC占用网络识别不规则障碍物", "7个800万像素摄像头行业最多", "代客泊车AVP最远2公里"],
    cons: ["雨天车道线识别仍不稳定", "纯视觉方案极端天气冗余不足", "企业运营状况不稳定", "Thor平台升级计划尚未落地"],
    models: [
      { name: "极越01 Max", year: "2026", cameras: 11, cameraDetail: "7×800万+4×300万环视", lidarCount: 0, mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },
      { name: "极越01 Max Performance", year: "2026", cameras: 11, cameraDetail: "7×800万+4×300万环视", lidarCount: 0, mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },

    ] as VehicleModel[],
  },
  {
    brand: "zhiji" as BrandKey,
    version: "IM AD 3.0",
    chip: "英伟达Thor",
    tops: 700,
    lidar: "1× 禾赛定制520线",
    cameras: 11,
    radar: "5× 毫米波",
    perception: "多模态融合+IM AD 3.0端到端",
    planning: "端到端大模型+无图NOA",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 8.4, laneChange: 8.8, leftTurn: 8.0, construction: 8.3, parking: 8.6 },
    pros: ["禾赛定制520线激光雷达点云密度等效1040线", "Thor 700TOPS+520线雷达全系标配不阉割", "IM AD 3.0端到端大模型感知规划控制一体", "智驾安全是人驾6.7倍", "全线控四轮转向+智驾深度协同"],
    cons: ["品牌认知度弱于头部新势力", "城区复杂场景接管率仍偏高", "IM AD 3.0端到端成熟度需验证", "老车型Orin-X 254TOPS算力差距大"],
    models: [
      { name: "LS6 (2026款)", year: "2026", cameras: 11, cameraDetail: "6×800万+5×200万", lidarCount: 1, lidarDetail: "1×禾赛定制520线(顶)", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "Thor", topsActual: 700, source: "官方" },



    ] as VehicleModel[],
  },
  {
    brand: "horizon" as BrandKey,
    version: "HSD V1.6 + 星空6P",
    chip: "征程6P / 星空Starry 6P(5nm)",
    tops: 650,
    lidar: "选配(1× 128线)",
    cameras: 11,
    radar: "3× 毫米波",
    perception: "一段式端到端+VLM+强化学习+BPU纳什",
    planning: "端到端+强化学习+KaKaClaw整车智能体OS",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: false,
    scores: { intersection: 8.8, laneChange: 9.1, leftTurn: 8.5, construction: 8.7, parking: 8.6 },
    pros: ["星空6P: 5nm舱驾融合芯片650TOPS+273GB/s带宽", "一芯取代智驾+座舱双系统，单车省1500-4000元", "国内首个量产一段式端到端辅助驾驶", "反应速度比人类平均反应快42%", "征程系列累计出货1000万套/40+车企/300+车型规模最大", "HSD V2.0计划Q3发布持续迭代"],
    cons: ["L4级能力尚未覆盖", "记忆泊车功能缺失", "星空6P Q3才量产上车当前无法体验", "比亚迪自研芯片短期订单流失30-40%"],
    models: [
      { name: "iCAR V27 (HSD版)", year: "2026", cameras: 11, lidarCount: 1, lidarDetail: "选配128线(顶)", mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "征程6P", topsActual: 560, source: "官方" },


    ] as VehicleModel[],
  },
  {
    brand: "weride" as BrandKey,
    version: "WRD 3.0 / Ride 6.0 (L4)",
    chip: "多芯片(NVIDIA/高通/芯擎星辰一号)",
    tops: 1016,
    lidar: "2× 千线级EM4冗余(Robotaxi)",
    cameras: 14,
    radar: "6× 毫米波冗余",
    perception: "多模态融合+WeRide ONE通用算法",
    planning: "一段式端到端+GENESIS仿真世界模型",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: true,
    memoryParking: true,
    scores: { intersection: 9.3, laneChange: 9.0, leftTurn: 9.1, construction: 9.2, parking: 8.8 },
    pros: ["WRD 3.0多芯片平台适配(200TOPS=2000TOPS效果)", "近30个车型定点(广汽/奇瑞等)", "L4 Robotaxi: 千线级EM4+SS8.0+HPC3.0", "芯擎星辰一号单芯512TOPS/多芯2048TOPS", "1100万+公里公开道路里程验证"],
    cons: ["L4 Robotaxi仅限运营不面向C端", "WRD 3.0乘用车方案量产车型尚少", "运营范围Robotaxi扩展速度偏慢", "多芯片平台适配增加维护复杂度"],
    models: [
      { name: "Robotaxi (SS 5.0套件)", year: "2026", cameras: 12, cameraDetail: "5×中距+2×长距+5×鱼眼/补盲", lidarCount: 7, lidarDetail: "3×固态(顶)+1×固态(尾翼)+3×补盲", mmwaveCount: 0, ultrasonicCount: 0, chipDetail: "多芯片冗余", topsActual: 1016, source: "官方" },

    ] as VehicleModel[],
  },
  {
    brand: "baidu" as BrandKey,
    version: "Apollo 8.0 (ASD V3.0)",
    chip: "NVIDIA Thor / 征程6P / 芯片X",
    tops: 780,
    lidar: "1× 128线(RT6: 8×激光雷达)",
    cameras: 11,
    radar: "3× 毫米波",
    perception: "纯视觉/多模态融合+ADFM大模型",
    planning: "端到端大模型+V2X车路协同5.0",
    e2e: true,
    bev: true,
    highwayNOA: true,
    cityNOA: true,
    mapFree: true,
    autoParking: true,
    valetParking: false,
    memoryParking: true,
    scores: { intersection: 8.9, laneChange: 8.7, leftTurn: 8.4, construction: 8.6, parking: 8.0 },
    pros: ["ADFM全球首个支持L4级自动驾驶大模型", "V2X车路协同5.0通行效率提升40%", "ASD V3.0 100TOPS稠密算力即可即插即用", "萝卜快跑1700万+订单全球最大", "昆仑芯M100 2026年量产推理芯片"],
    cons: ["ASD方案搭载车型仍偏少", "V2X基础设施依赖度高", "代客泊车功能尚未上线", "纯视觉方案极端天气稳定性存疑"],
    models: [
      { name: "极越01 (Apollo ASD)", year: "2026", cameras: 11, cameraDetail: "7×800万+4×300万环视", lidarCount: 0, mmwaveCount: 5, ultrasonicCount: 12, chipDetail: "2×Orin-X", topsActual: 508, source: "官方" },


    ] as VehicleModel[],
  },
];

// 版本中心数据
export const versionData: Record<string, {
  overview: { chip: string; tops: string; lidar: string; cameras: string; radar: string };
  versions: Array<{
    version: string; date: string; scope: string; type: string;
    points: string[]; rating: number;
  }>;
  stats: { total: number; avgCycle: string; lastUpdate: string; featureRatio: string; fixRatio: string };
}> = {
  huawei: {
    overview: { chip: "昇腾610 / 自研MDC 810", tops: "580 TOPS(L3:400/L4:2000)", lidar: "1× 896线双光路/6颗(M9 Ultra)", cameras: "13摄像头", radar: "5× 毫米波(含4D成像)" },
    versions: [
      { version: "ADS 5.0", date: "2026-04-15", scope: "发布核心细节", type: "新功能", points: ["城区L4级自动驾驶", "高速L3有条件自动驾驶", "WEWA架构全面升级", "车位到车位2.0", "预计Q3全量推送"], rating: 4.9 },
      { version: "ADS 4.1", date: "2026-05-15", scope: "全量推送", type: "新功能", points: ["eAES智能避障(边刹边让)", "后向VRU风险预警", "一键启动领航辅助", "城市NOA覆盖近400城"], rating: 4.8 },
      { version: "ADS 4.0", date: "2026-03-20", scope: "全量推送", type: "新功能", points: ["WEWA架构首发", "车位到车位1.0", "GOD 2.0升级至2.5版本", "复杂路口自主通行能力增强"], rating: 4.7 },
      { version: "ADS 3.3.0", date: "2026-01-10", scope: "全量推送", type: "优化", points: ["城区NCA无图通行全国覆盖", "GOD网络升级至2.0版本", "障碍物识别准确率提升至98.5%", "AEB误触发率降低40%"], rating: 4.6 },
      { version: "ADS 3.2.5", date: "2025-11-20", scope: "全量推送", type: "优化", points: ["城区NCA覆盖新增30城", "高速NOA变道平顺性优化", "自动泊车速度提升"], rating: 4.4 },
      { version: "ADS 3.2.0", date: "2025-09-08", scope: "全量推送", type: "新功能", points: ["城区NCA无保护左转能力", "AVP代客泊车功能上线", "GOD网络升级至1.5版本"], rating: 4.5 },
      { version: "ADS 3.1.0", date: "2025-07-01", scope: "全量推送", type: "新功能", points: ["城区NCA支持环岛通行", "高速NOA支持施工路段避让", "LCC增强路口通行能力"], rating: 4.3 },
    ],
    stats: { total: 7, avgCycle: "32天", lastUpdate: "15天", featureRatio: "57%", fixRatio: "0%" },
  },
  tesla: {
    overview: { chip: "双FSD Chip 2 (HW4.0)", tops: "720 TOPS", lidar: "无(4D毫米波'凤凰')", cameras: "11× 500万像素", radar: "4D毫米波雷达(6T8R)" },
    versions: [
      { version: "FSD V14 (中国版)", date: "2026-05-21", scope: "灰度推送", type: "新功能", points: ["FSD Supervised正式入华", "当前为功能缩减版2024.45.32.12", "满血V14版预计Q3全面推送", "中国路况专项适配进行中"], rating: 4.2 },
      { version: "FSD V14.3", date: "2026-04-01", scope: "海外推送", type: "新功能", points: ["自回归Transformer架构", "3-5秒时空记忆能力", "神经网络全面重构", "HW4.0适配完成"], rating: 4.6 },
      { version: "FSD V13.5", date: "2026-01-15", scope: "海外全量", type: "优化", points: ["视觉感知模型升级V3", "城市道路通行效率提升12%", "自动泊车速度优化"], rating: 4.3 },
      { version: "FSD V12.6", date: "2025-10-10", scope: "海外全量", type: "优化", points: ["端到端架构优化", "变道成功率提升至94%", "雨雾天气感知增强"], rating: 4.2 },
      { version: "FSD V12.5", date: "2025-07-20", scope: "海外全量", type: "新功能", points: ["FSD端到端架构首次发布", "城市NOA功能升级", "泊车辅助增强"], rating: 4.1 },
    ],
    stats: { total: 5, avgCycle: "52天", lastUpdate: "18天", featureRatio: "60%", fixRatio: "0%" },
  },
  xpeng: {
    overview: { chip: "自研图灵AI芯片", tops: "2250-3000 TOPS", lidar: "2× 96线(选配)", cameras: "12摄像头", radar: "5× 毫米波雷达" },
    versions: [
      { version: "XNGP 6.2.0 (VLA 2.0)", date: "2026-05-31", scope: "全量推送", type: "新功能", points: ["VLA 2.0端到端视觉-动作直连", "决策延迟降至80ms", "无导航NGP漫游功能", "P挡直接启动NGP"], rating: 4.9 },
      { version: "天玑AI OS 6.1.0", date: "2026-04-04", scope: "全量推送", type: "新功能", points: ["全新AI交互体验", "自研图灵芯片算力2250TOPS", "XNGP能力全面升级", "语音智驾指令扩展"], rating: 4.7 },
      { version: "XNGP 5.8.0", date: "2026-02-10", scope: "全量推送", type: "优化", points: ["城区NOA覆盖新增50城", "自动泊车成功率提升至96%", "AI代驾路线学习优化"], rating: 4.5 },
      { version: "XNGP 5.5.0", date: "2025-11-08", scope: "全量推送", type: "新功能", points: ["AI代驾模式上线", "自定义路线学习后自动巡航", "自动泊车成功率95%"], rating: 4.4 },
      { version: "XNGP 5.3.0", date: "2025-08-15", scope: "全量推送", type: "新功能", points: ["无图城区NOA首开放", "代客泊车功能上线", "MONA M03首搭城区NOA"], rating: 4.3 },
    ],
    stats: { total: 5, avgCycle: "36天", lastUpdate: "5天", featureRatio: "80%", fixRatio: "0%" },
  },
  lixiang: {
    overview: { chip: "双Orin-X", tops: "508 TOPS", lidar: "1× 128线(新车型禾赛ATL 116线)", cameras: "6×800万+5×200万", radar: "5× 毫米波(含4D)" },
    versions: [
      { version: "AD Max V13", date: "2026-03-15", scope: "全量推送", type: "新功能", points: ["1000万Clips模型全量推送", "VLA司机大模型+行为强化学习", "VLA充电功能上线", "AD Pro首次获城市NOA"], rating: 4.8 },
      { version: "OTA 8.2", date: "2026-01-21", scope: "全量推送", type: "优化", points: ["ETC自动通过稳定性提升", "高速NOA舒适性优化", "VLA司机大模型持续进化"], rating: 4.4 },
      { version: "AD Max V12", date: "2025-11-10", scope: "全量推送", type: "新功能", points: ["AD Max架构大版本升级", "VLA司机大模型首发", "城市LCC路口通行增强"], rating: 4.5 },
      { version: "OTA 7.5", date: "2025-08-20", scope: "全量推送", type: "优化", points: ["高速NOA使用率达78%", "记忆泊车功能增强", "LCC跟车距离优化"], rating: 4.2 },
      { version: "OTA 6.3", date: "2025-06-01", scope: "全量推送", type: "新功能", points: ["ETC自动通过功能上线", "AEB 150km/h生效范围扩展"], rating: 4.3 },
    ],
    stats: { total: 5, avgCycle: "42天", lastUpdate: "78天", featureRatio: "60%", fixRatio: "0%" },
  },
  nio: {
    overview: { chip: "4× Orin-X / 天玑NX9031 5nm", tops: "1016 TOPS", lidar: "3× 128线+4D成像雷达(Cedar)", cameras: "29个感知硬件(AQUILA)", radar: "5× 毫米波(含4D成像)" },
    versions: [
      { version: "Cedar雪松系统", date: "2026-04-20", scope: "ES9首发", type: "新功能", points: ["Cedar雪松智能系统首发", "神玑5nm智驾芯片", "AQUILA天鹰座超感系统", "全域领航辅助NOP+升级"], rating: 4.7 },
      { version: "NOP+ 5.0", date: "2026-02-15", scope: "全量推送", type: "新功能", points: ["群体智能路线共享升级", "城区NOP+覆盖新增40城", "自动泊车优化", "代客泊车功能上线"], rating: 4.5 },
      { version: "NOP+ 4.5", date: "2025-11-25", scope: "全量推送", type: "优化", points: ["高速领航舒适性提升", "感知模型升级", "AEB响应速度优化"], rating: 4.3 },
      { version: "NOP+ 4.2", date: "2025-09-10", scope: "全量推送", type: "新功能", points: ["群体智能路线共享首发", "城区NOP+覆盖新增15城"], rating: 4.2 },
      { version: "NOP+ 4.0", date: "2025-06-20", scope: "全量推送", type: "新功能", points: ["NOP+全面升级架构", "高速领航体验优化"], rating: 4.1 },
    ],
    stats: { total: 5, avgCycle: "48天", lastUpdate: "43天", featureRatio: "60%", fixRatio: "0%" },
  },
  horizon: {
    overview: { chip: "征程6P / 星空Starry 6P(5nm)", tops: "560 / 650 TOPS", lidar: "选配1× 128线激光雷达", cameras: "11摄像头", radar: "3× 毫米波雷达" },
    versions: [
      { version: "HSD V2.0(计划)", date: "2026-Q3(计划)", scope: "规划中", type: "新功能", points: ["安全水平/泊车/驾驶体验全面升级", "J6P芯片采用率提升", "更高级别城区场景覆盖"], rating: 0 },
      { version: "星空6P发布", date: "2026-04-22", scope: "发布即量产", type: "新功能", points: ["中国首款5nm舱驾融合芯片", "650TOPS BPU+3TFLOPS GPU+500KDMIPS CPU", "128GB LPDDR5X带宽273GB/s", "一芯取代智驾+座舱双系统，单车省1500-4000元", "10余家OEM+博世/电装等Tier1意向", "Q3正式量产上车"], rating: 4.9 },
      { version: "KaKaClaw咖咖虾OS", date: "2026-04-22", scope: "同步发布", type: "新功能", points: ["业内首款整车智能体操作系统", "理解-决策-执行-记忆-进化五维闭环", "跨域整合座舱与智驾功能模块", "Agentic AI原生设计"], rating: 4.7 },
      { version: "HSD V1.6", date: "2026-04-22", scope: "正式发布", type: "新功能", points: ["巡航跟车舒适性大幅提升", "路口动态博弈能力增强(等红灯选最快车道)", "遥控泊车+离车泊入+悬空障碍物识别", "起步提醒/倒车紧急制动/自动紧急转向避让/误踩油门防护"], rating: 4.8 },
      { version: "HSD V1.5 OTA", date: "2026-02-12", scope: "全量推送", type: "优化", points: ["量产首次OTA升级", "辅助驾驶行车质感优化", "泊车效率提升", "环境感知精度及HMI优化"], rating: 4.5 },
      { version: "征程6E量产", date: "2026-04-10", scope: "量产交付", type: "新功能", points: ["征程6E芯片128TOPS量产上车", "8家车企定点(比亚迪/奇瑞/一汽等)", "支持高速NOA+自动泊车", "预计2026年出货超200万片"], rating: 4.3 },
      { version: "HSD V1.0", date: "2025-09-20", scope: "全量推送", type: "新功能", points: ["国内首个量产一段式端到端辅助驾驶", "高速NOA首搭征程6P", "自动泊车AVP功能上线", "77%选装用户主动选择HSD版本"], rating: 4.5 },
    ],
    stats: { total: 7, avgCycle: "45天", lastUpdate: "42天", featureRatio: "86%", fixRatio: "0%" },
  },
  weride: {
    overview: { chip: "4× Orin-X冗余架构", tops: "1016 TOPS", lidar: "3× 128线冗余激光雷达", cameras: "7× 800万+7× 200万摄像头", radar: "4D毫米波成像雷达+3× 毫米波冗余" },
    versions: [
      { version: "Ride 6.0", date: "2026-05-20", scope: "三城运营", type: "新功能", points: ["L4级Robotaxi三城规模运营", "0接管率99.2%", "日均订单超2000单", "广州/北京/深圳同步运营"], rating: 4.9 },
      { version: "Ride 5.5", date: "2026-02-28", scope: "广州/北京", type: "优化", points: ["北京亦庄全无人运营扩展", "感知模型V4升级", "恶劣天气处理能力增强"], rating: 4.6 },
      { version: "Ride 5.0", date: "2025-11-15", scope: "广州", type: "新功能", points: ["广州全无人Robotaxi商业化", "L4级全场景覆盖", "夜间运营能力升级"], rating: 4.5 },
      { version: "Ride 4.5", date: "2025-08-20", scope: "广州", type: "优化", points: ["Robotaxi运营效率提升30%", "远程接管率降低至0.8%", "新增商圈覆盖区域"], rating: 4.3 },
    ],
    stats: { total: 4, avgCycle: "55天", lastUpdate: "14天", featureRatio: "75%", fixRatio: "0%" },
  },
  baidu: {
    overview: { chip: "NVIDIA Thor / 双征程6P", tops: "1000 TOPS", lidar: "1× 128线(高配3×)", cameras: "11× 800万摄像头", radar: "4D毫米波成像雷达" },
    versions: [
      { version: "Apollo 8.0", date: "2026-05-18", scope: "正式发布", type: "新功能", points: ["端到端大模型架构全面升级", "纯视觉城市NOA覆盖120城", "V2X车路协同扩展", "ASD方案搭载极越/岚图"], rating: 4.7 },
      { version: "Apollo 7.5", date: "2026-03-01", scope: "全量推送", type: "优化", points: ["城市NOA覆盖新增30城", "自动泊车成功率提升至91%", "V2X信号灯信息融合优化"], rating: 4.4 },
      { version: "Apollo 7.0", date: "2025-12-10", scope: "全量推送", type: "新功能", points: ["纯视觉城市NOA首发", "覆盖90城全国最广", "Robotaxi+乘用车双线升级"], rating: 4.5 },
      { version: "Apollo 6.5", date: "2025-09-15", scope: "全量推送", type: "优化", points: ["高速NOA变道舒适性提升", "AEB响应速度优化", "感知模型V3升级"], rating: 4.2 },
    ],
    stats: { total: 4, avgCycle: "50天", lastUpdate: "16天", featureRatio: "75%", fixRatio: "0%" },
  },
};

// 实测测评数据
export const testRecords = [
  {
    title: "华为ADS 5.0 城区L4深度实测(工程版)",
    brand: "huawei" as BrandKey,
    version: "ADS 5.0",
    scenes: ["城区"] as string[],
    score: 96,
    comfort: 94, safety: 97, efficiency: 95,
    date: "2026-05-28",
    source: "媒体实测" as string,
    conclusion: "城区L4级表现惊艳，复杂路口零接管通过率95%以上，WEWA架构规划效率大幅提升，但工程版仍偶发决策犹豫。",
  },
  {
    title: "特斯拉FSD V14 中国版首测(缩减版)",
    brand: "tesla" as BrandKey,
    version: "V14 (中国版)",
    scenes: ["城区", "高速"] as string[],
    score: 85,
    comfort: 88, safety: 84, efficiency: 82,
    date: "2026-05-25",
    source: "自测" as string,
    conclusion: "中国版功能缩减明显，部分路口能力受限，变道仍然果断但左转通过率仅82%，期待满血版Q3推送。",
  },
  {
    title: "小鹏XNGP 6.2 VLA 2.0 深度实测",
    brand: "xpeng" as BrandKey,
    version: "VLA 2.0",
    scenes: ["城区", "泊车"] as string[],
    score: 93,
    comfort: 91, safety: 92, efficiency: 94,
    date: "2026-06-01",
    source: "自测" as string,
    conclusion: "VLA 2.0决策延迟80ms体感质变，NGP漫游功能创新实用，自动泊车继续行业第一，复杂路口通过率稳定提升。",
  },
  {
    title: "理想AD Max V13 千万Clips实测",
    brand: "lixiang" as BrandKey,
    version: "V13",
    scenes: ["高速", "城区"] as string[],
    score: 90,
    comfort: 95, safety: 91, efficiency: 85,
    date: "2026-04-10",
    source: "车主反馈" as string,
    conclusion: "1000万Clips模型体感提升明显，VLA司机大模型行为拟人度高，高速舒适性行业顶级，城区仍有进步空间。",
  },
  {
    title: "蔚来NOP+ Cedar雪松系统实测",
    brand: "nio" as BrandKey,
    version: "Cedar",
    scenes: ["高速", "城区"] as string[],
    score: 87,
    comfort: 92, safety: 89, efficiency: 81,
    date: "2026-05-10",
    source: "媒体实测" as string,
    conclusion: "神玑5nm芯片算力释放充分，AQUILA 31个感知硬件冗余极强，群体智能数据共享优势明显，但城区迭代速度仍偏慢。",
  },
  {
    title: "比亚迪天神之眼5.0 城区领航实测",
    brand: "byd" as BrandKey,
    version: "天神之眼5.0",
    scenes: ["城区", "高速"] as string[],
    score: 82,
    comfort: 85, safety: 83, efficiency: 78,
    date: "2026-05-30",
    source: "媒体实测" as string,
    conclusion: "璇玑A3芯片性能优于预期，城市领航+智能泊车双场景安全兜底，但变道时机判断偏保守，通行效率待提升。",
  },
  {
    title: "小米Pilot 1.16 XLA+世界模型实测",
    brand: "xiaomi" as BrandKey,
    version: "Pilot 1.16",
    scenes: ["城区", "泊车"] as string[],
    score: 84,
    comfort: 86, safety: 85, efficiency: 80,
    date: "2026-05-20",
    source: "车主反馈" as string,
    conclusion: "XLA架构+世界模型推理能力有创新，全域车道级导航101城覆盖领先，但世界模型成熟度仍需验证，部分场景犹豫。",
  },
  {
    title: "极越PPA V1.5.0 100城实测",
    brand: "jiyue" as BrandKey,
    version: "PPA V1.5.0",
    scenes: ["城区", "高速"] as string[],
    score: 76,
    comfort: 75, safety: 72, efficiency: 78,
    date: "2026-04-15",
    source: "车主反馈" as string,
    conclusion: "PPA 100城覆盖拓展快，纯视觉方案成本低，但雨天场景车道线识别仍不稳定，NVIDIA Thor平台待搭载。",
  },
  {
    title: "地平线HSD V1.6 iCAR V27北京望京实测",
    brand: "horizon" as BrandKey,
    version: "HSD V1.6",
    scenes: ["城区"] as string[],
    score: 90,
    comfort: 88, safety: 92, efficiency: 89,
    date: "2026-06-02",
    source: "媒体实测" as string,
    conclusion: "一段式端到端+强化学习+VLM三重架构，人车博弈丝滑(等红灯选最快车道/违停果断绕行/识别公交车双闪提前绕行)，系统响应百毫秒级比人类快42%，城区体验已不输头部选手。但VLM通识能力在极端复杂场景仍需验证。",
  },
  {
    title: "地平线HSD V1.6 征程6P实车评测",
    brand: "horizon" as BrandKey,
    version: "HSD V1.6",
    scenes: ["城区", "高速"] as string[],
    score: 88,
    comfort: 87, safety: 90, efficiency: 86,
    date: "2026-05-30",
    source: "媒体实测" as string,
    conclusion: "征程6P芯片560TOPS能效比出色，BPU纳什架构推理效率高，城区NOA表现稳健。星空6P 5nm舱驾融合芯片已发布(Q3量产)，单车省1500-4000元成本优势明显。短板：记忆泊车缺失，V2.0 Q3发布待验证。",
  },
  {
    title: "文远知行Ride 6.0 L4 Robotaxi实测",
    brand: "weride" as BrandKey,
    version: "Ride 6.0",
    scenes: ["城区"] as string[],
    score: 95,
    comfort: 93, safety: 98, efficiency: 92,
    date: "2026-05-25",
    source: "媒体实测" as string,
    conclusion: "L4级0接管率99.2%表现惊艳，全冗余硬件安全极强，三城日均2000+订单运营数据领先，但仅限Robotaxi无法C端使用。",
  },
  {
    title: "百度Apollo 8.0 ASD端到端实测",
    brand: "baidu" as BrandKey,
    version: "Apollo 8.0",
    scenes: ["城区", "高速"] as string[],
    score: 86,
    comfort: 85, safety: 88, efficiency: 83,
    date: "2026-05-22",
    source: "自测" as string,
    conclusion: "端到端大模型架构升级明显，V2X车路协同独有优势，纯视觉城市NOA覆盖120城行业最广，但V2X基础设施依赖度高。",
  },
];

// BUG/问题汇总
export const bugList = [
  { brand: "tesla" as BrandKey, version: "FSD V14(中国版)", desc: "功能缩减版部分路口能力受限，左转通过率仅82%", trigger: "无保护左转、复杂多车道路口", level: "P0", status: "已确认", date: "2026-05-25" },
  { brand: "jiyue" as BrandKey, version: "PPA V1.5.0", desc: "雨天车道线识别丢失，车辆偏离车道", trigger: "中大雨、积水路面", level: "P0", status: "已确认", date: "2026-04-15" },
  { brand: "huawei" as BrandKey, version: "ADS 4.1", desc: "eAES智能避障在施工路段偶发减速过猛", trigger: "高速施工区域、锥桶密集", level: "P1", status: "已确认", date: "2026-05-15" },
  { brand: "xpeng" as BrandKey, version: "VLA 2.0", desc: "VLA架构偶发幽灵刹车，感知误检", trigger: "高架桥下阴影、大型广告牌", level: "P1", status: "已确认", date: "2026-06-01" },
  { brand: "lixiang" as BrandKey, version: "AD Max V13", desc: "环岛通行频繁退出LCC", trigger: "多出口环岛、车流量大", level: "P1", status: "已确认", date: "2026-04-10" },
  { brand: "byd" as BrandKey, version: "天神之眼5.0", desc: "城市领航变道时机判断偏保守", trigger: "车流密集城市快速路", level: "P2", status: "已确认", date: "2026-05-30" },
  { brand: "nio" as BrandKey, version: "Cedar", desc: "高速匝道汇入速度过低", trigger: "车流密集匝道入口", level: "P2", status: "已确认", date: "2026-05-10" },
  { brand: "xiaomi" as BrandKey, version: "Pilot 1.16", desc: "世界模型偶发推理错误导致不必要减速", trigger: "复杂施工路段、临时红绿灯", level: "P2", status: "已确认", date: "2026-05-20" },
  { brand: "horizon" as BrandKey, version: "HSD V1.6", desc: "城区复杂路口偶发规划路径不合理", trigger: "多岔路口、无信号灯路口", level: "P1", status: "已确认", date: "2026-05-30" },
  { brand: "horizon" as BrandKey, version: "HSD V1.6", desc: "记忆泊车功能缺失，无法实现路线记忆", trigger: "固定路线泊车场景", level: "P2", status: "规划中(V2.0)", date: "2026-06-01" },
  { brand: "horizon" as BrandKey, version: "星空6P", desc: "舱驾融合芯片Q3才量产上车，当前无法体验", trigger: "所有星空6P合作车型", level: "P2", status: "Q3量产", date: "2026-04-22" },
  { brand: "baidu" as BrandKey, version: "Apollo 8.0", desc: "V2X信号灯信息偶发延迟，影响通行决策", trigger: "V2X信号覆盖薄弱区域", level: "P2", status: "已确认", date: "2026-05-22" },
];

// 场景专项测评
export const sceneTests = {
  intersection: {
    name: "城市复杂路口",
    schemes: [
      { brand: "huawei" as BrandKey, successRate: "95.8%", takeover: "0.3次/百公里", time: "10.2s" },
      { brand: "xpeng" as BrandKey, successRate: "92.1%", takeover: "0.6次/百公里", time: "11.5s" },
      { brand: "tesla" as BrandKey, successRate: "82.3%", takeover: "1.8次/百公里", time: "15.8s" },
      { brand: "lixiang" as BrandKey, successRate: "85.6%", takeover: "1.2次/百公里", time: "13.9s" },
    ],
  },
  construction: {
    name: "高速施工路段",
    schemes: [
      { brand: "huawei" as BrandKey, successRate: "93.5%", takeover: "0.8次/百公里", time: "7.8s" },
      { brand: "xpeng" as BrandKey, successRate: "86.2%", takeover: "1.5次/百公里", time: "9.5s" },
      { brand: "tesla" as BrandKey, successRate: "80.1%", takeover: "2.5次/百公里", time: "11.8s" },
      { brand: "xiaomi" as BrandKey, successRate: "83.5%", takeover: "1.8次/百公里", time: "10.2s" },
    ],
  },
  parking: {
    name: "地下车库泊车",
    schemes: [
      { brand: "xpeng" as BrandKey, successRate: "96.0%", takeover: "0.2次/10次", time: "42s" },
      { brand: "huawei" as BrandKey, successRate: "91.5%", takeover: "0.5次/10次", time: "48s" },
      { brand: "lixiang" as BrandKey, successRate: "89.0%", takeover: "0.8次/10次", time: "52s" },
      { brand: "tesla" as BrandKey, successRate: "78.0%", takeover: "2.0次/10次", time: "65s" },
    ],
  },
};

// ===== 兼容旧页面的导出 =====

// 旧 brands 格式 (兼容首页/对比页等)
export const brands: Record<string, { name: string; bg: string; color: string; letter: string }> = {};
for (const [key, val] of Object.entries(brandConfig)) {
  brands[key] = { name: val.name, bg: val.color + "20", color: val.color, letter: val.icon };
}

// 旧 FeedTag 类型
export type FeedTag = "OTA" | "实测" | "评测" | "口碑" | "新功能" | "优化" | "行业";

// 旧 tagConfig
export const tagConfig: Record<FeedTag, { className: string; label: string; bg: string; text: string }> = {
  OTA: { className: "bg-primary/15 text-primary", label: "OTA", bg: "rgba(124,92,255,0.15)", text: "#7C5CFF" },
  实测: { className: "bg-accent/15 text-accent", label: "实测", bg: "rgba(105,231,255,0.15)", text: "#69E7FF" },
  评测: { className: "bg-emerald-500/15 text-emerald-400", label: "评测", bg: "rgba(98,250,211,0.15)", text: "#62FAD3" },
  口碑: { className: "bg-amber-500/15 text-amber-400", label: "口碑", bg: "rgba(255,183,77,0.15)", text: "#FFB74D" },
  新功能: { className: "bg-sky-500/15 text-sky-400", label: "新功能", bg: "rgba(56,189,248,0.15)", text: "#38BDF8" },
  优化: { className: "bg-lime-500/15 text-lime-400", label: "优化", bg: "rgba(132,204,22,0.15)", text: "#84CC16" },
  行业: { className: "bg-rose-500/15 text-rose-400", label: "行业", bg: "rgba(251,113,133,0.15)", text: "#FB7185" },
};

// 旧 hotSchemes 格式
export const hotSchemes = [
  { brand: "huawei" as BrandKey, brandKey: "huawei" as BrandKey, name: "华为ADS", version: "ADS 5.0", city: 9.5, highway: 9.6, parking: 9.1 },
  { brand: "tesla" as BrandKey, brandKey: "tesla" as BrandKey, name: "特斯拉FSD", version: "FSD V14", city: 9.1, highway: 9.4, parking: 7.8 },
  { brand: "xpeng" as BrandKey, brandKey: "xpeng" as BrandKey, name: "小鹏XNGP", version: "VLA 2.0", city: 9.0, highway: 9.3, parking: 9.6 },
  { brand: "lixiang" as BrandKey, brandKey: "lixiang" as BrandKey, name: "理想AD Max", version: "V13", city: 8.6, highway: 9.2, parking: 9.0 },
  { brand: "horizon" as BrandKey, brandKey: "horizon" as BrandKey, name: "地平线HSD", version: "HSD V1.6", city: 8.8, highway: 9.1, parking: 8.6 },
  { brand: "weride" as BrandKey, brandKey: "weride" as BrandKey, name: "文远知行", version: "Ride 6.0", city: 9.3, highway: 9.0, parking: 8.8 },
  { brand: "baidu" as BrandKey, brandKey: "baidu" as BrandKey, name: "百度Apollo", version: "Apollo 8.0", city: 8.9, highway: 8.7, parking: 8.0 },
  { brand: "zhiji" as BrandKey, brandKey: "zhiji" as BrandKey, name: "智己IM AD", version: "IM AD 3.0", city: 8.4, highway: 8.8, parking: 8.6 },
  { brand: "byd" as BrandKey, brandKey: "byd" as BrandKey, name: "比亚迪天神之眼", version: "天神之眼5.0", city: 8.3, highway: 8.0, parking: 8.5 },
];

// 旧 versionTimeline 格式
export const versionTimeline = [
  { date: "2026-06-03", brand: "horizon" as BrandKey, version: "HSD V2.0(计划Q3)", dotColor: "#E63946", highlights: ["高盛维持买入评级", "V2.0安全/泊车/驾驶全面升级", "J6P采用率预期上升"], points: ["高盛维持买入评级", "V2.0安全/泊车/驾驶全面升级", "J6P采用率预期上升"] },
  { date: "2026-06-01", brand: "huawei" as BrandKey, version: "ADS 5.0", dotColor: "#CF0A2C", highlights: ["城区L4级自动驾驶", "WEWA架构全面升级", "预计Q3全量推送"], points: ["城区L4级自动驾驶", "WEWA架构全面升级", "预计Q3全量推送"] },
  { date: "2026-05-31", brand: "xpeng" as BrandKey, version: "XNGP 6.2.0", dotColor: "#00B4AA", highlights: ["VLA 2.0端到端视觉-动作直连", "决策延迟降至80ms", "无导航NGP漫游"], points: ["VLA 2.0端到端视觉-动作直连", "决策延迟降至80ms", "无导航NGP漫游"] },
  { date: "2026-05-30", brand: "horizon" as BrandKey, version: "星空6P+比亚迪合作", dotColor: "#E63946", highlights: ["比亚迪正式意向合作星空6P", "单车省1500-4000元内存成本", "Q4首款合作车型落地"], points: ["比亚迪正式意向合作星空6P", "单车省1500-4000元内存成本", "Q4首款合作车型落地"] },
  { date: "2026-05-28", brand: "byd" as BrandKey, version: "天神之眼5.0", dotColor: "#C50000", highlights: ["自研璇玑A3芯片", "城市领航+智能泊车安全兜底"], points: ["自研璇玑A3芯片", "城市领航+智能泊车安全兜底"] },
  { date: "2026-04-22", brand: "horizon" as BrandKey, version: "HSD V1.6+星空6P+KaKaClaw", dotColor: "#E63946", highlights: ["中国首款5nm舱驾融合芯片650TOPS", "整车智能体OS咖咖虾发布", "HSD V1.6新增遥控泊车/倒车紧急制动"], points: ["中国首款5nm舱驾融合芯片650TOPS", "整车智能体OS咖咖虾发布", "HSD V1.6新增遥控泊车/倒车紧急制动"] },
  { date: "2026-05-21", brand: "tesla" as BrandKey, version: "FSD V14(中国版)", dotColor: "#CC0000", highlights: ["FSD Supervised正式入华", "当前为功能缩减版"], points: ["FSD Supervised正式入华", "当前为功能缩减版"] },
  { date: "2026-05-20", brand: "weride" as BrandKey, version: "Ride 6.0", dotColor: "#2EC4B6", highlights: ["L4级Robotaxi三城规模运营", "0接管率99.2%"], points: ["L4级Robotaxi三城规模运营", "0接管率99.2%"] },
  { date: "2026-05-18", brand: "baidu" as BrandKey, version: "Apollo 8.0", dotColor: "#306CFE", highlights: ["端到端大模型架构升级", "纯视觉城市NOA覆盖120城"], points: ["端到端大模型架构升级", "纯视觉城市NOA覆盖120城"] },
  { date: "2026-05-15", brand: "huawei" as BrandKey, version: "ADS 4.1", dotColor: "#CF0A2C", highlights: ["eAES智能避障", "城市NOA覆盖近400城"], points: ["eAES智能避障", "城市NOA覆盖近400城"] },
  { date: "2026-05-13", brand: "xiaomi" as BrandKey, version: "Pilot 1.16", dotColor: "#FF6900", highlights: ["XLA架构+世界模型", "全域车道级导航101城"], points: ["XLA架构+世界模型", "全域车道级导航101城"] },
];

// 旧 feedItems 兼容格式 (含 tag 字段)
export const feedItemsLegacy = feedItems.map((item) => ({
  ...item,
  tag: (item.tags[0] || "OTA") as FeedTag,
}));
