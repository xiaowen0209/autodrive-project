/**
 * 智能驾驶术语百科数据库
 * 每条术语包含：名称、简称、分类、定义、详细解释、关联术语、关联品牌
 */

export type TermCategory =
  | "感知"    // Perception
  | "决策"    // Planning & Decision
  | "控制"    // Control
  | "芯片"    // Chips & Computing
  | "算法"    // Algorithms & Models
  | "传感器"  // Sensors
  | "法规"    // Regulations
  | "架构"    // System Architecture
  | "通信"    // Communication
  | "评测"    // Testing & Evaluation
  | "定位"    // Localization & Mapping
  | "开发"    // Development & Toolchain
  | "人机"    // HMI & User Experience

export interface TermEntry {
  id: string
  name: string
  aliases: string[]         // 别名/缩写
  category: TermCategory
  difficulty: 1 | 2 | 3    // 1=入门 2=进阶 3=专家
  summary: string           // 一句话定义
  description: string       // 详细解释
  keyPoints?: string[]       // 关键要点(可选)
  relatedTerms: string[]    // 关联术语ID
  relatedBrands?: string[]  // 关联品牌key
  evolution?: string        // 技术演进说明
  controversy?: string      // 行业争议/不同路线
  commonMisconception?: string // 常见误区
}

export const termCategories: Record<TermCategory, { label: string; icon: string; color: string }> = {
  "感知": { label: "感知", icon: "👁", color: "#69E7FF" },
  "决策": { label: "决策", icon: "🧠", color: "#7C5CFF" },
  "控制": { label: "控制", icon: "🎯", color: "#62FAD3" },
  "芯片": { label: "芯片", icon: "⚡", color: "#FFB547" },
  "算法": { label: "算法", icon: "📐", color: "#FF6B9D" },
  "传感器": { label: "传感器", icon: "📡", color: "#A78BFA" },
  "法规": { label: "法规", icon: "⚖", color: "#F87171" },
  "架构": { label: "架构", icon: "🏗", color: "#34D399" },
  "通信": { label: "通信", icon: "📶", color: "#60A5FA" },
  "评测": { label: "评测", icon: "📊", color: "#FBBF24" },
  "定位": { label: "定位", icon: "📍", color: "#C084FC" },
  "开发": { label: "开发", icon: "🛠", color: "#FB923C" },
  "人机": { label: "人机", icon: "👤", color: "#4ADE80" },
}

export const terms: TermEntry[] = [
  // ========== 感知 ==========
  {
    id: "bev",
    name: "BEV",
    aliases: ["Bird's Eye View", "鸟瞰图", "BEV感知"],
    category: "感知",
    difficulty: 2,
    summary: "将多摄像头/传感器数据统一投影到俯视角（鸟瞰）空间，构建车辆周围统一3D表征",
    description: "BEV（Bird's Eye View）是当前智驾感知的主流范式。它将多个摄像头的2D图像通过神经网络变换，投影到一个以自车为中心的统一俯视3D空间中，形成类似\"上帝视角\"的环境理解。这样做的好处是：不同视角的摄像头信息不再割裂，障碍物的位置、大小、运动方向在统一坐标系下自然对齐，为后续规划决策提供一致的输入。",
    keyPoints: [
      "统一多摄像头信息到同一坐标系",
      "特斯拉2021年提出BEV+Transformer，引发行业跟进",
      "是端到端架构的基础组件之一",
      "BEV特征图分辨率直接影响感知精度"
    ],
    relatedTerms: ["transformer", "e2e", "occupancy", "lidar"],
    relatedBrands: ["tesla", "huawei", "xiaopeng"],
    evolution: "2D感知→BEV感知→BEV+Occupancy→端到端直接输出轨迹",
    controversy: "纯视觉BEV在极端天气/暗光下鲁棒性不如激光雷达点云BEV"
  },
  {
    id: "transformer",
    name: "Transformer",
    aliases: ["注意力机制", "Attention", "自注意力"],
    category: "算法",
    difficulty: 2,
    summary: "一种基于自注意力机制的深度学习架构，能捕获序列中任意位置间的依赖关系",
    description: "Transformer最初由Google在2017年提出用于自然语言处理，核心是Self-Attention（自注意力）机制——让模型在处理每个位置时，能\"看到\"并\"关注\"序列中所有其他位置。在智驾中，Transformer用于：1）将多摄像头图像融合为BEV特征（BEVFormer等）；2）时序信息建模（跟踪、预测他车轨迹）；3）端到端规划中的场景理解。相比传统CNN，Transformer能建模长距离依赖，更适合复杂交通场景。",
    keyPoints: [
      "Self-Attention是核心，计算复杂度O(n²)",
      "在智驾中主要用于多传感器融合和时序建模",
      "特斯拉率先将Transformer引入量产智驾",
      "ViT（Vision Transformer）是视觉领域的基础模型"
    ],
    relatedTerms: ["bev", "e2e", "vlm", "diffusion"],
    evolution: "CNN→CNN+Attention→纯Transformer(ViT)→多模态Transformer",
  },
  {
    id: "e2e",
    name: "端到端",
    aliases: ["End-to-End", "E2E", "一段式", "One Model"],
    category: "架构",
    difficulty: 2,
    summary: "从传感器原始输入到车辆控制输出，用一个大模型直接映射，省去传统模块化流水线",
    description: "端到端智驾是当前行业最热门的技术路线。传统方案将智驾拆分为感知→预测→规划→控制多个模块，各模块独立训练、人工设计接口。端到端则用一个神经网络直接从传感器数据输出行驶轨迹/控制指令，中间不做人工拆分。优势是：1）信息无损传递，没有模块间信息瓶颈；2）系统更简洁，迭代更快；3）行为更像人类驾驶。挑战是：1）不可解释，出问题难定位；2）需要海量优质驾驶数据训练；3）安全边界难以保证。",
    keyPoints: [
      "特斯拉FSD V12率先量产端到端",
      "华为ADS 4.0/5.0、小鹏VLA 2.0均已转向端到端",
      "一段式（纯E2E）vs 两段式（感知E2E+规则安全兜底）是行业争论焦点",
      "训练数据规模和质量是核心壁垒"
    ],
    relatedTerms: ["bev", "transformer", "vlm", "occupancy", "imitation-learning"],
    relatedBrands: ["tesla", "huawei", "xiaopeng", "lixiang"],
    evolution: "规则模块化→部分学习化→两段式端到端→一段式端到端",
    controversy: "一段式端到端的安全性争议最大：无法在中间插入安全规则兜底"
  },
  {
    id: "occupancy",
    name: "Occupancy Network",
    aliases: ["占据网络", "占用网络", "Occupancy", "体素"],
    category: "感知",
    difficulty: 2,
    summary: "将3D空间划分为体素网格，预测每个体素是否被占据，实现对任意形状障碍物的检测",
    description: "Occupancy Network是特斯拉在2022年AI Day提出的技术。传统感知需要预设障碍物类别（车、人、锥桶等），遇到未定义的物体（如侧翻卡车、掉落轮胎）会漏检。Occupancy Network则将车辆周围的3D空间划分为小立方体（体素/Voxel），预测每个体素是否\"被占据\"——不管是什么物体，只要占据空间就标出来。这极大提升了通用障碍物检测能力，是解决\"长尾场景\"的关键技术。",
    keyPoints: [
      "解决\"未知障碍物\"检测问题，不再依赖预设类别",
      "体素分辨率决定感知精度与计算量的权衡",
      "可与BEV特征结合，先BEV后Occupancy",
      "是纯视觉方案补齐激光雷达优势的关键"
    ],
    relatedTerms: ["bev", "e2e", "lidar"],
    relatedBrands: ["tesla", "huawei", "xiaopeng"],
    evolution: "2D目标检测→3D边界框→BEV语义分割→Occupancy Network→4D Occupancy(时序)"
  },
  {
    id: "lidar",
    name: "激光雷达",
    aliases: ["LiDAR", "激光扫描", "点云传感器"],
    category: "传感器",
    difficulty: 1,
    summary: "发射激光脉冲测量距离，生成高精度3D点云，是智驾感知的核心传感器之一",
    description: "激光雷达通过发射激光脉冲并接收反射信号，计算飞行时间得到距离，生成周围环境的3D点云。核心指标包括线数（如128线、896线）、探测距离（200m+）、点频、视场角等。线数越多，垂直方向的分辨率越高，远处小障碍物越容易检测到。华为ADS 5.0首创896线双光路激光雷达，线数是传统128线的7倍。激光雷达的优势是精度高、不受光照影响；劣势是成本高（尽管已从数万美元降至数百美元）、雨雪雾天性能下降。",
    keyPoints: [
      "线数决定垂直分辨率：16/32线(入门)→128线(主流)→896线(华为最新)",
      "905nm vs 1550nm波长：905nm成本低但有视网膜安全限制，1550nm功率更高探测更远",
      "固态vs机械旋转：固态更可靠更便宜，是行业趋势",
      "价格已从>$10000降至<$500(入门款)"
    ],
    relatedTerms: ["bev", "occupancy", "mmwave", "camera", "sensor-fusion"],
    relatedBrands: ["huawei", "xiaopeng", "nio", "lixiang"],
    evolution: "机械64线→半固态128线→纯固态→双光路896线(华为)→芯片化LiDAR",
    controversy: "纯视觉派(特斯拉)认为激光雷达是'拐杖'，多传感器融合派认为激光雷达是安全冗余必备"
  },
  {
    id: "mmwave",
    name: "4D毫米波雷达",
    aliases: ["4D Imaging Radar", "成像雷达", "4D毫米波", "毫米波雷达"],
    category: "传感器",
    difficulty: 2,
    summary: "传统毫米波雷达的升级版，增加了俯仰角分辨和点云密度，可生成类图像的环境感知",
    description: "4D毫米波雷达在传统3D毫米波（距离、速度、方位角）基础上增加了俯仰角（高度）维度的分辨能力，点云密度从几十点提升到数千点，能生成类似激光雷达的点云图像。核心优势：1）全天候工作，不受雨雪雾影响（这是激光雷达和摄像头的短板）；2）直接测量速度（多普勒效应），摄像头和激光雷达只能间接估算；3）成本远低于激光雷达（$100-200 vs $300-1000）。华为和特斯拉都在4D毫米波上有重要布局。",
    keyPoints: [
      "全天候工作能力是其最大优势",
      "点云密度不及激光雷达，但成本更低",
      "特斯拉'凤凰'4D毫米波(6T8R)是FSD HW4.0新增硬件",
      "可部分替代低价激光雷达，但高端场景仍需激光雷达"
    ],
    relatedTerms: ["lidar", "camera", "sensor-fusion"],
    relatedBrands: ["tesla", "huawei", "byd"],
    evolution: "3D毫米波(角度分辨率低)→4D成像雷达(类LiDAR点云)→Cascaded MIMO(级联天线)",
  },
  {
    id: "camera",
    name: "摄像头",
    aliases: ["Camera", "视觉传感器", "CMOS", "IMX"],
    category: "传感器",
    difficulty: 1,
    summary: "智驾最基础的传感器，通过图像捕捉环境信息，成本最低但受光照和天气影响",
    description: "摄像头是智驾系统中数量最多的传感器，负责捕捉可见光图像。核心指标包括像素（200万/500万/800万）、帧率、动态范围(HDR)、低照度性能等。当前主流方案用800万像素摄像头（如索尼IMX728/IMX490），特斯拉HW4.0用11个500万摄像头。纯视觉方案（特斯拉、极越）完全依赖摄像头；融合方案中摄像头负责颜色/纹理/文字识别（如红绿灯、车道线），配合激光雷达提供深度信息。",
    keyPoints: [
      "像素升级趋势：200万→500万→800万，高像素=远距离细节更好",
      "HDR和低照度性能是关键，隧道出入口是典型挑战场景",
      "摄像头怕水雾遮挡，需要自清洁功能（雨刷/加热膜）",
      "纯视觉方案需要极强算法弥补深度信息缺失"
    ],
    relatedTerms: ["lidar", "mmwave", "bev", "sensor-fusion", "e2e"],
    relatedBrands: ["tesla", "jiyue"],
  },
  {
    id: "sensor-fusion",
    name: "多传感器融合",
    aliases: ["Sensor Fusion", "前融合", "后融合", "特征级融合"],
    category: "感知",
    difficulty: 2,
    summary: "将摄像头、激光雷达、毫米波雷达等多种传感器数据整合，形成更完整可靠的环境感知",
    description: "多传感器融合是指将不同传感器的数据在某个层级上合并，互补各自短板。融合层级分为：1）前融合（Early Fusion）：原始数据层直接合并，信息保留最完整但计算量大；2）特征级融合（Feature Fusion）：各传感器先提取特征再融合，是当前主流；3）后融合（Late Fusion）：各传感器独立出结果再合并，信息损失最大但最简单。华为/小鹏/理想等采用BEV特征级融合，将摄像头图像特征和激光雷达点云特征投影到统一的BEV空间中。",
    keyPoints: [
      "前融合信息最完整，后融合最简单，特征级融合是当前最优平衡",
      "BEV空间是当前最主流的融合框架",
      "融合时机：同步问题（各传感器帧率不同）是工程难点",
      "冗余性：单传感器故障不影响整体安全"
    ],
    relatedTerms: ["lidar", "mmwave", "camera", "bev"],
    relatedBrands: ["huawei", "xiaopeng", "nio", "lixiang"],
  },
  {
    id: "vlm",
    name: "VLM",
    aliases: ["Vision Language Model", "视觉语言模型", "视觉大模型", "多模态大模型"],
    category: "算法",
    difficulty: 3,
    summary: "能同时理解图像和文本的多模态大模型，让智驾系统具备\"常识推理\"能力",
    description: "VLM（Vision Language Model）将视觉理解和语言推理结合，是智驾系统迈向\"类人智能\"的关键。传统智驾只能识别训练过的物体类别，VLM则能理解场景语义：比如看到前方施工标志能理解\"需要变道\"，看到校车能推理\"可能有儿童突然出现\"。小鹏VLA 2.0的VLA（Vision-Language-Action）就是在VLM基础上加入动作输出，实现\"看→理解→做\"的统一。理想AD Max V13也采用了端到端+VLM双系统架构。",
    keyPoints: [
      "解决\"常识缺失\"问题：传统感知只能识别，不能推理",
      "VLA = VLM + Action，直接从视觉到驾驶动作",
      "推理延迟是量产瓶颈：大模型推理耗时>100ms，影响实时性",
      "小鹏VLA 2.0去掉'语言翻译'环节，直接视觉→动作，延迟降至80ms"
    ],
    relatedTerms: ["e2e", "transformer", "llm"],
    relatedBrands: ["xiaopeng", "lixiang", "huawei"],
    evolution: "纯视觉CNN→BEV+Transformer→VLM(理解场景)→VLA(理解+行动)",
  },
  {
    id: "llm",
    name: "LLM",
    aliases: ["Large Language Model", "大语言模型", "语言大模型"],
    category: "算法",
    difficulty: 2,
    summary: "基于Transformer的大规模语言模型，在智驾中用于场景理解、交互和知识推理",
    description: "LLM（Large Language Model）如GPT、Llama等在智驾中的角色正在从\"辅助\"走向\"核心\"。当前应用：1）交互层：语音交互理解用户意图（\"帮我找个充电站\"）；2）推理层：作为VLM的语言部分，提供常识推理能力；3）数据层：生成合成训练数据、自动标注；4）规划层：部分方案尝试用LLM做高层规划（如Wayve的LINGO-1）。但LLM的推理延迟和幻觉问题仍是量产挑战。",
    keyPoints: [
      "LLM的'世界知识'可弥补智驾系统的常识缺失",
      "推理延迟（>100ms）和幻觉是量产核心挑战",
      "云端LLM用于数据生成和自动标注已是标配",
      "车端LLM目前主要用于交互，规划层应用仍在探索"
    ],
    relatedTerms: ["vlm", "transformer", "e2e"],
  },
  {
    id: "tops",
    name: "TOPS",
    aliases: ["Tera Operations Per Second", "算力", "万亿次操作/秒"],
    category: "芯片",
    difficulty: 1,
    summary: "衡量AI芯片计算能力的单位，1 TOPS = 每秒1万亿次INT8运算",
    description: "TOPS是当前衡量智驾芯片算力的主流指标，表示芯片每秒能执行的INT8精度神经网络运算次数。但TOPS不等于实际可用算力——实际算力取决于：1）算力利用率（通常30%-80%，小鹏图灵芯片号称82.5%）；2）内存带宽（算力再大，数据喂不进去也白搭）；3）模型适配度（不同架构的芯片跑同一模型效率差异很大）。当前主流：Orin-X 254 TOPS、双Orin 508 TOPS、Thor 700-2000 TOPS。",
    keyPoints: [
      "TOPS是理论峰值，实际利用率才是关键",
      "INT8 TOPS和FP16 TOPS不同，对比时注意精度",
      "内存带宽（GB/s）往往比TOPS更是瓶颈",
      "算力需求趋势：L2+需要100+TOPS，L3需要400+TOPS，L4需要2000+TOPS"
    ],
    relatedTerms: ["orin", "thor", "journey6", "turing-chip"],
  },
  {
    id: "orin",
    name: "NVIDIA Orin",
    aliases: ["Orin-X", "Orin N", "NVIDIA Orin", "英伟达Orin"],
    category: "芯片",
    difficulty: 1,
    summary: "NVIDIA面向自动驾驶的SoC芯片，Orin-X 254 TOPS，是当前量产智驾的'标配'芯片",
    description: "NVIDIA Orin是当前智驾行业使用最广泛的芯片平台。Orin-X（254 TOPS）是高配版，支持L2++到L3；Orin-N（86 TOPS）是低配版，用于L2/L2+方案。Orin采用Ampere GPU架构+深度学习加速器DLA，支持INT8/FP16/FP32多种精度。几乎所有中国新势力品牌都使用Orin-X（理想双Orin、蔚来4×Orin等）。但Orin正在被下一代Thor芯片替代，算力差距显著。",
    keyPoints: [
      "Orin-X 254 TOPS是当前行业'标配'",
      "多家品牌使用：理想(2×)、蔚来(4×)、极越(2×)、智己等",
      "算力利用率约50%-60%，不如专用芯片高效",
      "正在被Thor（700+TOPS）替代，但Orin方案仍有2-3年量产周期"
    ],
    relatedTerms: ["tops", "thor", "journey6"],
    relatedBrands: ["lixiang", "nio", "jiyue", "zhiji"],
  },
  {
    id: "thor",
    name: "NVIDIA Thor",
    aliases: ["Thor", "NVIDIA Thor-U", "Tegra Thor", "下一代Orin"],
    category: "芯片",
    difficulty: 2,
    summary: "NVIDIA下一代智驾芯片，单颗700-2000 TOPS，支持舱驾融合，2025-2026量产上车",
    description: "Thor是NVIDIA继Orin之后的下一代智驾旗舰芯片，采用Blackwell架构，单颗算力700 TOPS（Thor-U）到2000 TOPS，支持舱驾融合（一颗芯片同时驱动智驾和座舱）。关键升级：1）算力是Orin-X的3-8倍；2）支持FP8精度推理，效率更高；3）集成新一代DLA和光追加速器；4）支持多实例GPU（MIG），灵活分配算力。比亚迪天神之眼5.0(3×Thor)、小米HAD、智己IM AD 3.0等已宣布采用。",
    keyPoints: [
      "单颗700-2000 TOPS，可替代多颗Orin",
      "舱驾融合：一颗芯片跑智驾+座舱，降低成本",
      "FP8精度支持是关键升级，推理效率大幅提升",
      "已获比亚迪、小米、智己等品牌定点"
    ],
    relatedTerms: ["tops", "orin", "journey6", "turing-chip"],
    relatedBrands: ["byd", "xiaomi", "zhiji"],
  },
  {
    id: "journey6",
    name: "地平线征程6",
    aliases: ["征程6", "J6", "J6E", "J6M", "J6P", "征程6P", "BPU纳什"],
    category: "芯片",
    difficulty: 2,
    summary: "地平线第三代车规级智驾芯片，征程6P 560 TOPS，最新星空6P 5nm 650 TOPS",
    description: "征程6是地平线继征程3/5之后的第三代智驾芯片系列，采用自研BPU纳什计算架构。产品矩阵：J6E(128 TOPS，入门)、J6M(200 TOPS，主力)、J6P(560 TOPS，旗舰)。2025年底地平线发布新一代星空6P(Starry 6P)，5nm工艺，650 TOPS，算力利用率>75%。征程系列累计出货超1000万片，合作车企覆盖大众、比亚迪、奇瑞等。HSD(Horizon SuperDrive)是地平线基于征程6的智驾方案品牌。",
    keyPoints: [
      "J6P 560 TOPS是当前旗舰，星空6P 650 TOPS是升级版",
      "BPU纳什架构算力利用率高(>75%)，有效算力接近理论值",
      "已获大众、比亚迪、奇瑞等定点，出货量超1000万",
      "星空6P 5nm工艺，功耗更低，更适合舱驾融合"
    ],
    relatedTerms: ["tops", "orin", "thor", "hsd"],
    relatedBrands: ["horizon"],
  },
  {
    id: "turing-chip",
    name: "图灵AI芯片",
    aliases: ["小鹏图灵", "自研芯片", "Turing Chip"],
    category: "芯片",
    difficulty: 3,
    summary: "小鹏自研智驾芯片，单颗2250-3000 TOPS，有效算力相当于10颗Orin-X",
    description: "小鹏图灵AI芯片是小鹏汽车自研的智驾专用芯片，2025年随小鹏P7+首次量产上车。核心参数：单颗2250-3000 TOPS，算力利用率82.5%，有效算力约1850-2475 TOPS（相当于10颗Orin-X）。芯片采用双NPU架构，专为大模型推理优化，支持VLA 2.0端到端模型推理。这是中国新势力车企中自研芯片算力最高的方案。",
    keyPoints: [
      "2250-3000 TOPS，新势力自研芯片算力最高",
      "算力利用率82.5%，行业领先（Orin约50-60%）",
      "专为端到端/VLA大模型优化，非通用GPU",
      "单颗芯片跑完整VLA 2.0，不需要多芯片互联"
    ],
    relatedTerms: ["tops", "orin", "thor", "e2e", "vlm"],
    relatedBrands: ["xiaopeng"],
  },
  {
    id: "hsd",
    name: "HSD",
    aliases: ["Horizon SuperDrive", "地平线智驾方案", "地平线HSD"],
    category: "架构",
    difficulty: 2,
    summary: "地平线全栈智驾方案品牌，当前V1.6，一段式端到端+VLM，2026年Q3计划发布V2.0",
    description: "HSD(Horizon SuperDrive)是地平线2024年发布的全栈智驾方案品牌，不卖硬件卖方案。HSD V1.5首次OTA（2025年4月），V1.6随年度发布会发布（2025年6月），采用一段式端到端+VLM架构，配合KaKaClaw整车智能体OS。核心差异化：1）\"Together模式\"通过模型蒸馏让低配芯片也享受高配能力；2）等红灯选最快车道等拟人化行为；3）开放生态，不绑定单一车企。V2.0计划2026年Q3发布。",
    keyPoints: [
      "一段式端到端+VLM，与特斯拉FSD架构类似",
      "Together模式：模型蒸馏让J6M也能跑接近J6P的效果",
      "KaKaClaw OS：整车智能体，打通智驾+座舱+底盘",
      "V2.0计划Q3发布，预计大幅提升城区能力"
    ],
    relatedTerms: ["e2e", "vlm", "journey6"],
    relatedBrands: ["horizon"],
  },
  {
    id: "imitation-learning",
    name: "模仿学习",
    aliases: ["Imitation Learning", "行为克隆", "Behavioral Cloning", "BC"],
    category: "算法",
    difficulty: 2,
    summary: "让AI模型通过学习人类驾驶数据来模仿人类驾驶行为，是端到端智驾的核心训练方法",
    description: "模仿学习是端到端智驾最核心的训练范式：给模型看大量人类驾驶视频+操作数据，让它学会在类似场景下做出类似操作。特斯拉FSD V12用数百万段人类驾驶Clips训练，理想AD Max V13用800万Clips。关键挑战：1）分布偏移（训练数据与实际遇到的情况不完全一致）；2）因果混淆（模型学到的是相关性而非因果关系）；3）数据质量（坏习惯也会被学到）。DAgger和强化学习是改进方向。",
    keyPoints: [
      "端到端智驾的核心训练方法",
      "数据量是关键壁垒：特斯拉>500万Clips，理想800万Clips",
      "分布偏移是根本挑战：训练时没见过的场景可能表现很差",
      "常与强化学习(RL)结合使用弥补不足"
    ],
    relatedTerms: ["e2e", "reinforcement-learning", "vlm"],
    relatedBrands: ["tesla", "lixiang"],
  },
  {
    id: "reinforcement-learning",
    name: "强化学习",
    aliases: ["Reinforcement Learning", "RL", "奖励驱动学习"],
    category: "算法",
    difficulty: 3,
    summary: "通过试错和奖励信号让模型学习最优策略，在智驾中用于解决模仿学习无法覆盖的场景",
    description: "强化学习让模型通过与环境交互获得奖励/惩罚信号来优化策略。在智驾中，RL主要用于：1）补充模仿学习的不足（如紧急避让等人类数据稀缺场景）；2）仿真环境中的大规模训练（低成本获取大量经验）；3）多智能体交互（如无保护左转的博弈）。地平线HSD V1.6使用强化学习实现\"等红灯选最快车道\"等拟人行为。挑战：奖励函数设计困难，仿真到现实(sim-to-real)的迁移差距。",
    keyPoints: [
      "与模仿学习互补：解决训练数据稀缺场景",
      "仿真训练是主流方式，但sim-to-real差距是挑战",
      "奖励函数设计是核心难题：复杂交通难以用简单奖励描述",
      "地平线HSD已量产应用RL，行业首例"
    ],
    relatedTerms: ["e2e", "imitation-learning"],
    relatedBrands: ["horizon", "tesla"],
  },
  {
    id: "noa",
    name: "NOA",
    aliases: ["Navigate on Autopilot", "导航辅助驾驶", "领航辅助", "NCA", "NGP", "NOP"],
    category: "架构",
    difficulty: 1,
    summary: "导航辅助驾驶的总称，车辆可在导航路线指引下自动完成变道、上下匝道等操作",
    description: "NOA（Navigate on Autopilot）是智驾能力的核心功能形态：在导航路线指引下，车辆可自动完成变道、超车、上下匝道、通过红绿灯等操作。各品牌叫法不同：华为叫NCA、小鹏叫NGP、蔚来叫NOP+、特斯拉叫FSD（早期叫NOA）。NOA分为高速NOA（相对简单）和城区NOA（难度极高，2023-2024年行业核心竞争点）。当前行业正在从\"有图NOA\"向\"无图NOA\"（不依赖高精地图）演进。",
    keyPoints: [
      "各品牌叫法不同但本质相同：华为NCA、小鹏NGP、蔚来NOP+",
      "高速NOA已基本普及，城区NOA是当前竞争焦点",
      "无图NOA是行业趋势：不依赖高精地图，全国都能开",
      "NOA不等于自动驾驶，驾驶员仍需随时接管"
    ],
    relatedTerms: ["e2e", "bev", "lidar"],
    relatedBrands: ["huawei", "xiaopeng", "nio", "tesla"],
  },
  {
    id: "l3",
    name: "L3级自动驾驶",
    aliases: ["L3", "有条件自动驾驶", "Level 3", "条件自动驾驶"],
    category: "法规",
    difficulty: 2,
    summary: "在特定条件下系统完全负责驾驶，驾驶员可脱手脱眼，系统无法处理时需驾驶员接管",
    description: "L3级自动驾驶是有条件自动化：在ODD（运行设计域）内，系统完全负责驾驶，驾驶员可以脱手脱眼，但如果系统请求接管，驾驶员必须在规定时间内接管。这是法律责任的分水岭——L2及以下驾驶员负全责，L3在自动驾驶模式下事故责任由车企承担。中国2023年底放开L3试点，华为ADS 5.0宣称L3级双域融合架构，奔驰是全球首个L3量产品牌（Drive Pilot，仅限高速拥堵场景）。核心争议：接管过渡期（10-15秒）的安全保障。",
    keyPoints: [
      "法律责任的分水岭：L3自动驾驶模式下事故由车企负责",
      "ODD限制：只在特定场景/条件下生效",
      "接管过渡期（10-15秒）是最大安全隐患",
      "中国2023年底开启L3试点，华为/奔驰/宝马获首批牌照"
    ],
    relatedTerms: ["odd", "tor", "functional-safety"],
    relatedBrands: ["huawei", "mercedes"],
    controversy: "接管过渡期内驾驶员可能在做其他事（看手机等），10秒内能否有效接管存疑"
  },
  {
    id: "odd",
    name: "ODD",
    aliases: ["Operational Design Domain", "运行设计域", "设计运行域"],
    category: "法规",
    difficulty: 2,
    summary: "定义自动驾驶系统可以正常运行的条件范围（道路类型、天气、速度等），超出ODD系统必须退出",
    description: "ODD是自动驾驶安全框架的核心概念，定义了系统\"在什么条件下能用\"。ODD包括：道路类型（高速/城区/停车场）、环境条件（晴天/雨雪/夜间）、速度范围、地理区域等。ODD越宽，系统能力越强但验证难度指数级增长。华为ADS 5.0的L3 ODD限定在\"高速+城区特定路段+天气良好\"。奔驰Drive Pilot的L3 ODD极其保守：仅高速拥堵、<60km/h、白天、有前车引导。ODD扩展是智驾竞争的实质。",
    keyPoints: [
      "ODD定义了系统能力的边界",
      "ODD越宽能力越强，但验证成本指数级增长",
      "L3必须明确声明ODD，超出ODD出事车企免责",
      "各品牌ODD标准不统一，横向比较困难"
    ],
    relatedTerms: ["l3", "tor", "functional-safety"],
  },
  {
    id: "tor",
    name: "接管请求",
    aliases: ["Take-over Request", "TOR", "接管", "handover"],
    category: "法规",
    difficulty: 2,
    summary: "L3系统在无法继续自动驾驶时向驾驶员发出的接管请求，驾驶员必须在限定时间内接管",
    description: "接管请求（TOR）是L3级自动驾驶的核心安全机制。当系统检测到即将超出ODD或遇到无法处理的场景时，必须发出TOR给驾驶员。关键问题：1）接管过渡时间（Transition Time）：行业标准建议10-15秒，但研究显示驾驶员从\"做其他事\"到\"完全恢复情景感知\"可能需要40秒以上；2）TOR的可靠性：如果系统连自动驾驶都搞不定，它判断\"何时该请求接管\"的判断是否可靠？3）驾驶员状态监测：需要DMS确认驾驶员能接管。",
    keyPoints: [
      "10-15秒接管过渡期是行业标准，但争议很大",
      "驾驶员从分心到恢复情景感知可能需要40秒+",
      "系统发出TOR的能力本身就不可靠（可能漏发）",
      "DMS（驾驶员监测系统）是保障TOR生效的必要条件"
    ],
    relatedTerms: ["l3", "odd", "dms"],
  },
  {
    id: "dms",
    name: "DMS",
    aliases: ["Driver Monitoring System", "驾驶员监测系统", "驾驶员监控"],
    category: "传感器",
    difficulty: 1,
    summary: "通过车内摄像头监测驾驶员状态（疲劳/分心），是L3自动驾驶的安全保障组件",
    description: "DMS通过方向盘后方的红外摄像头实时监测驾驶员的面部朝向、眼睑开合、头部姿态等，判断驾驶员是否疲劳、分心或离开驾驶位。L2+用于提醒（\"请注视前方\"），L3用于确认驾驶员能否接管（TOR前必须确认驾驶员状态）。技术趋势：1）从2D视觉升级到3D视觉+红外，暗光也能检测；2）从单一DMS扩展到OMS（Occupant Monitoring，监测全车乘员）；3）隐私保护需求增加。",
    keyPoints: [
      "L3自动驾驶的必要安全组件",
      "红外摄像头确保暗光环境也能工作",
      "从DMS(仅监测驾驶员)扩展到OMS(监测全车乘员)",
      "隐私争议：车内摄像头数据如何存储和使用"
    ],
    relatedTerms: ["l3", "tor", "camera"],
  },
  {
    id: "diffusion",
    name: "扩散模型",
    aliases: ["Diffusion Model", "去噪扩散", "DDPM"],
    category: "算法",
    difficulty: 3,
    summary: "通过逐步去噪生成数据的生成式模型，在智驾中用于轨迹生成和多模态规划",
    description: "扩散模型是当前最热门的生成式AI技术之一（Stable Diffusion、DALL-E等都基于此）。在智驾中，扩散模型用于轨迹生成：将轨迹规划视为\"从噪声中逐步去噪生成最优轨迹\"的过程。优势：1）天然支持多模态输出（同一场景可生成多条合理轨迹）；2）训练稳定，不像GAN那样有模式崩塌问题；3）可结合条件信息（目标点、避障约束等）做条件生成。华为和Waymo都在探索扩散模型用于规划。挑战是推理速度（多步去噪耗时），需要蒸馏加速。",
    keyPoints: [
      "轨迹规划的新范式：从规则搜索变为生成式",
      "天然多模态：同一场景可生成多条合理路线",
      "推理速度是瓶颈：多步去噪>100ms，需蒸馏加速",
      "华为/Waymo已有公开研究，量产应用仍在探索"
    ],
    relatedTerms: ["e2e", "transformer"],
    relatedBrands: ["huawei"],
  },
  {
    id: "functional-safety",
    name: "功能安全",
    aliases: ["Functional Safety", "ISO 26262", "ASIL", "功能安全等级"],
    category: "法规",
    difficulty: 3,
    summary: "确保汽车电子系统在故障时仍能安全运行的标准体系，ASIL-D是最高安全等级",
    description: "功能安全（ISO 26262）是汽车电子系统的安全标准，核心是根据危害分析和风险评估确定ASIL（汽车安全完整性等级）：ASIL-A（最低）→ASIL-D（最高）。智驾系统关键组件（如转向、制动控制）通常要求ASIL-D。实现方式：1）硬件冗余（双路供电、双MCU）；2）软件冗余（看门狗、多样化设计）；3）降级策略（故障后进入安全状态）。华为ADS 5.0的L3双域融合架构就是为满足ASIL-D而设计。",
    keyPoints: [
      "ASIL-D是智驾关键组件必须达到的安全等级",
      "冗余设计是核心手段：双路供电、双MCU、双传感器",
      "降级策略：故障后从L3→L2→最小风险策略(MRC)",
      "认证周期长、成本高，是小厂进入智驾的门槛"
    ],
    relatedTerms: ["l3", "odd"],
    relatedBrands: ["huawei"],
  },
  {
    id: "world-model",
    name: "世界模型",
    aliases: ["World Model", "世界引擎", "预测模型"],
    category: "算法",
    difficulty: 3,
    summary: "对物理世界进行内部建模和预测的系统，让智驾具备'想象'和'预判'能力",
    description: "世界模型是智驾领域最受关注的前沿方向之一。它让AI不仅能感知当前场景，还能预测未来几秒场景如何演变（其他车会怎么动、行人会往哪走）。类似人类驾驶员的'预判'能力——看到路边球滚出来就知道后面可能有小孩追。实现方式：1）基于视频预测（GAIA-1、UniSim等）；2）基于3D场景生成（OccWorld等）；3）基于语言+视觉联合预测。华为60EFLOPS云端算力很大部分用于世界模型训练。挑战：预测精度和计算成本。",
    keyPoints: [
      "让智驾从'反应式'变为'预判式'",
      "视频预测是世界模型最主流的实现方式",
      "需要极大规模云端算力训练（华为60EFLOPS）",
      "仍是研究阶段，量产应用可能还需2-3年"
    ],
    relatedTerms: ["vlm", "e2e", "transformer"],
    relatedBrands: ["huawei", "tesla"],
  },

  // ===== 评测 =====
  {
    id: "aeb",
    name: "自动紧急制动",
    aliases: ["AEB", "Autonomous Emergency Braking", "主动刹车"],
    category: "评测",
    difficulty: 1,
    summary: "车辆检测到前方碰撞风险时自动刹车的安全系统，是ADAS最基础也是最重要的功能之一。",
    description: "AEB通过前向摄像头/雷达/激光雷达检测与前方车辆、行人或障碍物的距离和相对速度，当判断即将发生碰撞且驾驶员未采取行动时，自动触发制动。E-NCAP/C-NCAP均将AEB纳入评分体系，是L2级辅助驾驶的标配功能。近年AEB-VRU（弱势道路使用者）测试愈发重要，涵盖行人、自行车、摩托车等场景。",
    keyPoints: [
      "触发阈值通常为TTC（碰撞时间）< 2-3秒",
      "E-NCAP 2026要求AEB-VRU夜间场景也有效",
      "国内C-NCAP 2024版新增AEB Cyclist测试",
      "误触发率是核心KPI，幽灵刹车严重影响体验",
      "华为eAES（智能避障）是AEB的进化版：边刹边让"
    ],
    relatedTerms: ["fcw", "sotif"],
    relatedBrands: ["huawei", "tesla", "byd"],
  },
  {
    id: "fcw",
    name: "前向碰撞预警",
    aliases: ["FCW", "Forward Collision Warning"],
    category: "评测",
    difficulty: 1,
    summary: "检测到与前车/障碍物存在碰撞风险时发出声光警告，比AEB更早介入的预警系统。",
    description: "FCW在TTC较长（通常2-4秒）时触发警告，不执行制动，仅提醒驾驶员注意。是AEB的前置功能，FCW报警后如果驾驶员未响应才会触发AEB。评测关注误报率和漏报率的平衡。",
    keyPoints: [
      "通常比AEB更早触发（TTC更长）",
      "E-NCAP FCW测试包含白天/夜间/城市/高速场景",
      "误报过多导致用户关闭功能，形同虚设",
      "雨雾天气误报率显著上升"
    ],
    relatedTerms: ["aeb", "ldw"],
  },
  {
    id: "disengagement",
    name: "接管率",
    aliases: ["Disengagement Rate", "接管次数", "脱管率", "DIR"],
    category: "评测",
    difficulty: 2,
    summary: "自动驾驶系统运行中需要人类驾驶员接管控制的频率，是衡量系统成熟度的核心指标。",
    description: "接管率通常以每千公里/每百英里接管次数表示。加州DMV要求所有测试自动驾驶的公司每年披露接管数据。接管率越低，说明系统应对复杂场景的能力越强。但接管率本身不能完全代表安全水平——有时系统主动请求接管（如ODD边界）反而是负责任的设计。",
    keyPoints: [
      "加州DMV定义：从自动驾驶模式切换到人工模式的次数",
      "Waymo 2024年接管率约0.03次/千英里，行业领先",
      "接管原因分类：系统故障/环境超限/规划失败/感知丢失",
      "国内尚无强制披露要求，数据透明度不足",
      "不应仅看总量，需结合行驶场景复杂度分析"
    ],
    relatedTerms: ["odd", "shadow-mode"],
  },
  {
    id: "shadow-mode",
    name: "影子模式",
    aliases: ["Shadow Mode", "影子驾驶", "Shadow Testing"],
    category: "评测",
    difficulty: 2,
    summary: "系统在后台静默运行自动驾驶算法但不行使控制权，对比算法决策与人类驾驶员操作来发现差异和改进点。",
    description: "特斯拉首创并大规模使用影子模式：FSD系统在后台持续计算'如果是我会怎么做'，与实际驾驶员操作对比。差异场景被回传用于训练数据挖掘。这是数据飞轮的核心——量产车就是测试车，每时每刻都在产生训练数据。国内厂商（华为/小鹏/理想）也在跟进，但规模远不及特斯拉。",
    keyPoints: [
      "特斯拉影子模式覆盖数百万辆车，日行程数千万公里",
      "关键价值：发现长尾场景（Corner Case）",
      "数据回传带宽和隐私合规是挑战",
      "国内厂商通过仿真+有限影子模式弥补数据差距",
      "影子模式不是安全验证手段，是训练数据采集手段"
    ],
    relatedTerms: ["disengagement", "e2e", "simulation"],
    relatedBrands: ["tesla", "huawei", "xpeng"],
  },
  {
    id: "simulation",
    name: "仿真测试",
    aliases: ["Simulation", "Sim Testing", "虚拟测试", "数字孪生"],
    category: "评测",
    difficulty: 2,
    summary: "在虚拟环境中模拟自动驾驶系统运行，用于大规模回归测试和长尾场景验证，是实车测试的必要补充。",
    description: "仿真测试在计算机中重建道路、交通、天气等场景，让自动驾驶算法在虚拟世界中运行。核心价值：1）安全性——可测试危险场景而不冒真实风险；2）规模——日行百万公里虚拟里程；3）可重复——精确复现Bug场景做回归。行业共识是仿真里程应占验证总里程的90%以上。关键指标：仿真与实车的一致性（Sim2Real Gap）。",
    keyPoints: [
      "CARLA/LGSVL是常用开源仿真平台",
      "特斯拉2025年日仿真能力达500万帧",
      "华为'八爪鱼'平台日仿真里程超1000万公里",
      "Sim2Real Gap是核心挑战——仿真场景不够真实",
      "场景库构建：法规场景+事故复现场景+Corner Case"
    ],
    relatedTerms: ["shadow-mode", "sotif", "sil-testing"],
    relatedBrands: ["tesla", "huawei", "xpeng"],
  },
  {
    id: "sotif",
    name: "预期功能安全",
    aliases: ["SOTIF", "ISO 21448", "预期功能安全性"],
    category: "评测",
    difficulty: 3,
    summary: "解决自动驾驶系统在无故障情况下因功能局限（如恶劣天气、传感器盲区）导致的安全问题，区别于传统功能安全。",
    description: "SOTIF（Safety Of The Intended Functionality）关注的是系统设计本身的局限，而非硬件故障。例如：摄像头在暴雨中看不清车道线，系统并没有故障，但其功能不足以安全应对。SOTIF与ISO 26262（功能安全）互补：26262管'系统坏了怎么办'，SOTIF管'系统没坏但不够用怎么办'。对于高阶自动驾驶，SOTIF的重要性甚至超过功能安全。",
    keyPoints: [
      "ISO 21448 2022版正式发布，SOTIF成为国际标准",
      "核心方法：识别触发条件→分析危险场景→验证安全",
      "与ISO 26262互补，二者共同覆盖自动驾驶安全",
      "AI系统的SOTIF分析是行业难题——神经网络不可解释",
      "中国GB/T 43267-2023等同采用ISO 21448"
    ],
    relatedTerms: ["asil", "functional-safety", "odd"],
  },
  {
    id: "asil",
    name: "汽车安全完整性等级",
    aliases: ["ASIL", "Automotive Safety Integrity Level", "安全等级"],
    category: "评测",
    difficulty: 2,
    summary: "ISO 26262定义的汽车功能安全等级，从A到D递增，D级最严格。自动驾驶核心功能通常要求ASIL-D。",
    description: "ASIL根据严重度（Severity）、暴露概率（Exposure）、可控性（Controllability）三个维度评估。ASIL-D意味着：一旦失效可能导致致命伤害，且驾驶员无法控制。例如：AEB、转向控制等关键功能需ASIL-D，仪表显示可能只需ASIL-A。满足ASIL-D要求硬件冗余、软件多样性、详尽的验证测试。",
    keyPoints: [
      "ASIL-A(最低) → ASIL-B → ASIL-C → ASIL-D(最高)",
      "QM（质量管理）级低于ASIL-A，无特殊安全要求",
      "ASIL-D要求：硬件诊断覆盖率>99%，软件需要多样性",
      "双Orin-X方案可实现互为冗余满足ASIL-D",
      "芯片功能安全认证：ASIL-B(D)是常见标注"
    ],
    relatedTerms: ["sotif", "functional-safety"],
  },
  {
    id: "functional-safety",
    name: "功能安全",
    aliases: ["FuSa", "Functional Safety", "ISO 26262"],
    category: "评测",
    difficulty: 2,
    summary: "确保汽车电子电气系统在故障时不产生不可接受的风险，ISO 26262是核心标准。",
    description: "功能安全关注系统性故障和随机硬件故障。对于智驾系统，核心要求包括：感知冗余（摄像头+雷达）、决策冗余（主芯片+备份芯片）、执行冗余（双路制动/转向）。华为的L3双域融合架构就是典型的功能安全设计——主域和备份域独立运行，200ms内完成切换。",
    keyPoints: [
      "ISO 26262是汽车功能安全的基础标准",
      "随机硬件故障通过FMEDA分析和定量评估",
      "系统性故障通过开发流程管控（V模型）",
      "智驾系统需要多层冗余才能满足ASIL-D",
      "华为ADS 5.0的200ms紧急响应是L3功能安全的体现"
    ],
    relatedTerms: ["asil", "sotif"],
    relatedBrands: ["huawei"],
  },
  {
    id: "odd",
    name: "运行设计域",
    aliases: ["ODD", "Operational Design Domain", "设计运行域", "运行范围"],
    category: "评测",
    difficulty: 2,
    summary: "自动驾驶系统被设计能在其中正常运行的环境条件范围，包括道路类型、天气、速度等限制。",
    description: "ODD定义了系统'能做什么'和'不能做什么'的边界。例如：某系统ODD可能限制为'封闭高速公路、晴好天气、时速60-120km/h'。超出ODD时系统应安全退出（降级或靠边停车）。ODD越宽，系统能力越强，但验证难度指数级增长。L3/L4法规要求明确定义ODD。",
    keyPoints: [
      "ODD六大维度：道路/环境/速度/交通/天气/时间",
      "L3法规(UN R157)要求ODD明确定义且不可自行扩展",
      "城市NOA本质是ODD从高速扩展到城区",
      "无图方案是ODD从有地图区域扩展到任意道路",
      "'全域'是终极目标但当前远未实现"
    ],
    relatedTerms: ["disengagement", "sotif"],
  },
  {
    id: "sil-testing",
    name: "软件在环测试",
    aliases: ["SIL", "Software-in-the-Loop", "SIL测试"],
    category: "评测",
    difficulty: 2,
    summary: "将自动驾驶软件代码编译后在PC上运行，配合仿真环境进行测试验证，是V模型开发流程中的关键环节。",
    description: "SIL测试将实际目标代码（而非模型代码）在真实编译器编译后运行在仿真环境中。与MIL（模型在环）、HIL（硬件在环）构成完整的V模型验证链。SIL优势：可自动化大规模回归、无需硬件、可精确注入故障。局限：无法验证时序、中断等实时性问题。智驾行业SIL测试覆盖率目标通常>90%。",
    keyPoints: [
      "MIL → SIL → HIL → 实车 构成完整验证链",
      "SIL测试代码与量产代码一致（同编译器同优化）",
      "可自动化回归，CI/CD流水线核心环节",
      "无法验证实时性和硬件交互",
      "行业要求SIL测试覆盖率>90%"
    ],
    relatedTerms: ["simulation", "sotif"],
  },
  {
    id: "ncap",
    name: "新车评价规程",
    aliases: ["NCAP", "E-NCAP", "C-NCAP", "C-NCAP 2024"],
    category: "评测",
    difficulty: 1,
    summary: "独立第三方对新车安全性能进行评级测试的规程，近年大幅增加ADAS/智驾相关测试项目。",
    description: "NCAP并非法规（不强制），但星级评价直接影响消费者购买决策和品牌声誉。E-NCAP 2026版ADAS测试占比显著提升，新增：AEB-VRU夜间、AEB Cyclist、LKA高速弯道、驾驶员监控系统（DMS）等。C-NCAP 2024版也大幅强化智驾测试，包括AEB行人/骑行者、车道保持等场景。",
    keyPoints: [
      "E-NCAP五星要求ADAS得分率>70%",
      "2026版E-NCAP新增AEB-VRU夜间和AEB Cyclist",
      "C-NCAP 2024版AEB权重从8%提升至15%",
      "智驾功能评级正从'加分项'变为'必考项'",
      "国内IIHS/C-IASI也开始测试AEB性能"
    ],
    relatedTerms: ["aeb", "fcw", "ldw"],
  },
  {
    id: "ldw",
    name: "车道偏离预警",
    aliases: ["LDW", "Lane Departure Warning", "车道偏离提醒"],
    category: "评测",
    difficulty: 1,
    summary: "车辆在未打转向灯的情况下偏离当前车道时发出警告，是L2级ADAS的基础功能。",
    description: "LDW通过前向摄像头检测车道线，当判断车辆即将或已经偏离车道且未开启转向灯时，通过方向盘震动、声音或视觉提示警告驾驶员。是LKA（车道保持辅助）的前置功能。雨天/积雪/标线不清时LDW性能大幅下降，也是评测扣分重灾区。",
    keyPoints: [
      "E-NCAP LDW测试包含直道/弯道/不同车速",
      "雨天/积雪/标线不清时误报率上升",
      "LDW仅警告不控制，LKA才会主动纠偏",
      "高速公路场景下LDW价值最大"
    ],
    relatedTerms: ["lka", "aeb", "ncap"],
  },
  {
    id: "lka",
    name: "车道保持辅助",
    aliases: ["LKA", "Lane Keeping Assist", "车道保持", "LCC"],
    category: "评测",
    difficulty: 1,
    summary: "在车辆偏离车道时自动施加轻微转向力将车辆拉回车道内，是L2级辅助驾驶的核心功能之一。",
    description: "LKA在LDW基础上增加了转向干预，通过EPS（电动助力转向）施加转向力矩。分两种模式：LKA（仅在即将偏离时纠正）和LCC（车道居中控制，持续保持居中）。城市/高速NOA的基础就是LCC+ACC的组合。E-NCAP对LKA的测试包含弯道保持、避障回正等场景。",
    keyPoints: [
      "LKA纠正式 vs LCC居中式：LCC体验更好",
      "脱手检测（HOD）是LKA的安全约束",
      "大曲率弯道/匝道是LKA的常见失败场景",
      "部分车型LKA在60km/h以下不激活"
    ],
    relatedTerms: ["ldw", "acc", "ncap"],
  },
  {
    id: "acc",
    name: "自适应巡航控制",
    aliases: ["ACC", "Adaptive Cruise Control", "自适应巡航"],
    category: "评测",
    difficulty: 1,
    summary: "根据前车速度自动调整本车速度和车距的巡航系统，是L2级辅助驾驶最基本的功能。",
    description: "ACC通过前向雷达/摄像头检测前车，自动控制油门和刹车以保持设定车速和安全距离。全速域ACC（FSRA）支持0-150km/h全速域跟车，STOP&GO功能可在拥堵中自动跟停和起步。ACC+LCC/LKA的组合就是最基础的L2辅助驾驶。评测关注：加减速平顺性、跟停响应速度、被加塞应对。",
    keyPoints: [
      "ACC是最成熟的ADAS功能，技术门槛相对低",
      "全速域ACC（0-150km/h）是当前主流",
      "STOP&GO拥堵跟车是核心体验指标",
      "加减速平顺性、跟车距离合理性是评测重点",
      "ACC是L2的'腿'，LCC/LKA是L2的'手'"
    ],
    relatedTerms: ["lka", "tja", "ica"],
  },
  {
    id: "tja",
    name: "交通拥堵辅助",
    aliases: ["TJA", "Traffic Jam Assist", "拥堵辅助"],
    category: "评测",
    difficulty: 1,
    summary: "在低速拥堵场景下自动控制车辆跟车和保持在车道内行驶的L2级功能，是ACC+LCC在拥堵场景的特化版本。",
    description: "TJA本质是ACC+LCC在0-60km/h低速场景的组合应用，针对走走停停的拥堵工况优化了加减速策略和跟车距离。部分系统支持拥堵场景下的自动变道。TJA通常不需要高精地图，是'入门级'智驾功能。",
    keyPoints: [
      "TJA = 低速ACC + 低速LCC",
      "0-60km/h速域，主要针对城市拥堵",
      "加减速更柔和，跟停再起步更迅速",
      "是消费者最常使用的智驾功能之一"
    ],
    relatedTerms: ["acc", "lka", "ica"],
  },
  {
    id: "ica",
    name: "集成式巡航辅助",
    aliases: ["ICA", "Integrated Cruise Assist", "智能巡航"],
    category: "评测",
    difficulty: 1,
    summary: "在结构化道路（高速/城市快速路）上自动控制车速、车距和车道居中的L2功能，是TJA的高速版。",
    description: "ICA = 高速ACC + 高速LCC，在60-120km/h速域工作。与TJA的区别：ICA面向高速/快速路场景，车速更高，对车道识别和前车检测的要求更严。ICA+TJA组合实现全速域L2辅助驾驶。",
    keyPoints: [
      "ICA = 高速ACC + 高速LCC",
      "60-120km/h速域，面向高速/快速路",
      "是高速NOA的前置/基础版本",
      "部分品牌将ICA作为标配，NOA作为付费/高配"
    ],
    relatedTerms: ["acc", "tja", "lka"],
  },
  {
    id: "mpc",
    name: "模型预测控制",
    aliases: ["MPC", "Model Predictive Control"],
    category: "评测",
    difficulty: 3,
    summary: "通过在有限时域内优化未来控制序列的算法，广泛用于自动驾驶的轨迹规划和控制层。",
    description: "MPC在每个时刻求解一个有限时域内的最优控制问题，只执行第一步控制，然后滚动优化。优势：可显式处理约束（如车辆动力学极限、道路边界）、可预测未来行为、适用于多目标优化。在智驾中，MPC常用于轨迹跟踪和运动控制层。端到端方案正在替代部分MPC模块，但在安全关键的底层控制中MPC仍有不可替代的优势。",
    keyPoints: [
      "滚动优化：每步求解，只执行第一步",
      "可显式处理约束（速度/加速度/曲率限制）",
      "计算复杂度高，实时性是挑战",
      "在端到端架构中，MPC可能仅作为底层安全兜底",
      "线性MPC/非线性MPC/Tube MPC是常见变体"
    ],
    relatedTerms: ["e2e", "planning"],
    relatedBrands: ["huawei", "xpeng"],
  },

  // ========== 决策 (补充) ==========
  {
    id: "pnc",
    name: "PNC",
    aliases: ["Planning and Control", "规划与控制", "规控"],
    category: "决策",
    difficulty: 2,
    summary: "规划与控制的合称，智驾系统从感知到执行的核心环节",
    description: "PNC（Planning and Control）是自动驾驶系统中连接感知与执行的桥梁。规划(Planning)负责生成安全、高效的行驶路径，控制(Control)负责将规划轨迹精确转化为车辆执行指令。PNC通常分为三层：任务规划(全局路线)、行为规划(宏观决策如换道/让行)、轨迹规划(具体行驶曲线)，以及底层的横纵向控制。行业趋势是从模块化PNC向端到端一体化演进。",
    keyPoints: [
      "PNC = Planning(规划) + Control(控制)",
      "规划分三层：任务规划→行为规划→轨迹规划",
      "控制分横向(方向盘)和纵向(油门刹车)，复杂场景需横纵耦合",
      "传统模块化PNC正在被端到端架构逐步替代",
      "PNC的难点在于实时性、安全性和舒适性的平衡"
    ],
    relatedTerms: ["planning", "mpc", "e2e"],
  },
  {
    id: "behavior_planning",
    name: "行为规划",
    aliases: ["Behavior Planning", "决策规划", "宏观决策"],
    category: "决策",
    difficulty: 2,
    summary: "决定车辆应采取的宏观驾驶行为，如跟车、换道、超车、让行等",
    description: "行为规划是PNC系统的中间层，负责根据感知和预测模块输出的环境信息，结合道路规则和交通状况，做出高层次驾驶决策。行为规划需要综合考虑安全性、效率性、舒适性和合法性。传统实现方式包括有限状态机(FSM)、决策树和规则引擎，现代方案越来越多地采用基于学习的方法(如模仿学习+强化学习)。端到端架构中，行为规划与轨迹规划的边界正在模糊化。",
    keyPoints: [
      "传统方法：有限状态机(FSM)/决策树/规则引擎",
      "现代方法：模仿学习+强化学习，端到端隐式决策",
      "核心挑战：多目标权衡(安全/效率/舒适/合法)",
      "常见行为：跟车、换道、超车、让行、停车、绕行",
      "选道犹豫、过度避让是典型问题"
    ],
    relatedTerms: ["pnc", "planning", "e2e"],
  },
  {
    id: "trajectory_planning",
    name: "轨迹规划",
    aliases: ["Trajectory Planning", "路径规划", "运动规划"],
    category: "决策",
    difficulty: 2,
    summary: "生成满足行为决策的具体行驶轨迹，包括位置、速度、加速度的时间序列",
    description: "轨迹规划是行为规划和运动控制之间的桥梁，需要将抽象的行为意图转化为具体的运动轨迹。轨迹规划必须满足三类约束：安全性约束(不碰撞、不越界)、运动学约束(车辆物理特性)、动力学约束(加速度/曲率限制)。常用算法包括：基于采样的方法(RRT/RRT*)、基于搜索的方法(A*/Hybrid A*)、基于优化的方法(MPC/二次规划)。端到端架构中，轨迹可能直接由网络输出。",
    keyPoints: [
      "三大约束：安全性+运动学+动力学",
      "采样法：RRT/RRT*，适合高维空间但不保证最优",
      "搜索法：A*/Hybrid A*，结构化道路常用",
      "优化法：MPC/QP，可显式处理约束",
      "端到端趋势：网络直接输出轨迹点或控制量"
    ],
    relatedTerms: ["pnc", "mpc", "behavior_planning"],
  },
  {
    id: "task_planning",
    name: "任务规划",
    aliases: ["Task Planning", "全局路径规划", "Route Planning"],
    category: "决策",
    difficulty: 1,
    summary: "根据导航目的地规划全局行驶路线，类似于导航软件的路线规划",
    description: "任务规划是PNC系统的最顶层，负责根据用户输入的目的地，结合高精地图和实时路况信息，规划出全局最优行驶路线。任务规划通常考虑道路类型、限速、实时拥堵、施工信息等因素，选择时间最短或距离最短的路线。与传统导航不同的是，智驾系统的任务规划还需要考虑自动驾驶能力的覆盖范围，例如优先选择支持NOA的高速/城市快速路。",
    keyPoints: [
      "PNC最顶层，等同于高精导航路线规划",
      "考虑因素：道路类型/限速/拥堵/施工/智驾覆盖范围",
      "与传统导航区别：需考虑自动驾驶ODD边界",
      "输出：waypoint序列，供下游行为规划使用"
    ],
    relatedTerms: ["pnc", "hd_map"],
  },
  {
    id: "prediction",
    name: "预测",
    aliases: ["Prediction", "轨迹预测", "行为预测", "Motion Prediction"],
    category: "决策",
    difficulty: 2,
    summary: "预测其他交通参与者(车辆/行人/骑行者)的未来运动轨迹和行为意图",
    description: "预测模块是感知和决策之间的关键环节。它需要根据其他交通参与者的历史运动轨迹、当前状态和场景上下文，推断其未来几秒内的可能行为和运动轨迹。预测的不确定性是智驾系统的核心挑战之一——行人可能突然变向，前车可能急刹。传统方法使用卡尔曼滤波等物理模型，现代方法使用深度学习(如Transformer-based)进行多模态预测(输出多条可能轨迹+概率)。",
    keyPoints: [
      "核心挑战：交通参与者行为的高度不确定性",
      "传统方法：卡尔曼滤波/物理运动模型",
      "现代方法：深度学习多模态预测(多条轨迹+概率分布)",
      "VRU(弱势道路使用者)预测难度最高：行为随机、目标小",
      "预测时长通常3-5秒，越远不确定性越大"
    ],
    relatedTerms: ["pnc", "behavior_planning"],
    controversy: "端到端架构中是否需要显式预测模块存在争议——一些方案认为网络隐式包含了预测能力，另一些则认为显式预测对安全至关重要"
  },
  {
    id: "odd",
    name: "ODD",
    aliases: ["Operational Design Domain", "运行设计域", "设计运行域"],
    category: "决策",
    difficulty: 2,
    summary: "自动驾驶系统设计时定义的正常运行条件范围，超出则需人类接管",
    description: "ODD（Operational Design Domain）是自动驾驶系统被设计可以在其中安全运行的条件集合，包括道路类型、速度范围、天气条件、光照条件、交通状况等维度。ODD是法规认证(如UN R157)的核心概念，也是L3/L4级别自动驾驶的法律边界。当系统检测到即将超出ODD时，必须发出接管请求并确保最小风险状态。不同方案的ODD范围差异巨大——高速NOA的ODD很窄，全场景智驾的ODD则宽得多。",
    keyPoints: [
      "六大维度：道路类型/速度/天气/光照/交通/地理区域",
      "UN R157法规将ODD作为L3认证的核心要求",
      "ODD越宽，系统越难，但用户体验越好",
      "城区NOA正在大幅扩展ODD：从高速→城区→车位到车位",
      "ODD边界定义的精确性直接影响安全评估"
    ],
    relatedTerms: ["l3", "takeover", "sotif"],
    evolution: "行业趋势是从窄ODD(仅高速)向宽ODD(全场景)演进，华为'全国都能开'本质上就是ODD的大幅扩展"
  },

  // ========== 控制 (补充) ==========
  {
    id: "lateral_control",
    name: "横向控制",
    aliases: ["Lateral Control", "转向控制", "方向盘控制"],
    category: "控制",
    difficulty: 2,
    summary: "控制车辆方向盘转角，实现车道保持、变道、转弯等横向运动",
    description: "横向控制是PNC系统控制层的两个基本维度之一，负责控制车辆的转向，使车辆沿规划轨迹行驶。横向控制的核心目标是让车辆精确跟随规划路径，同时保证乘坐舒适性(避免频繁修正方向盘导致的晃动)。常用算法包括纯追踪(Pure Pursuit)、Stanley方法和MPC。横向控制的难点在于：不同车速下车辆动力学特性差异大、路面附着系数变化、侧风干扰等。",
    keyPoints: [
      "控制方向盘转角，实现车道保持/变道/转弯",
      "常用算法：Pure Pursuit/Stanley/MPC",
      "难点：不同车速动力学差异/路面附着变化/侧风",
      "评价指标：轨迹跟踪精度/方向盘抖动/变道平顺性"
    ],
    relatedTerms: ["pnc", "mpc", "longitudinal_control"],
  },
  {
    id: "longitudinal_control",
    name: "纵向控制",
    aliases: ["Longitudinal Control", "加减速控制", "油门刹车控制"],
    category: "控制",
    difficulty: 2,
    summary: "控制车辆油门和刹车，实现跟车、定速、减速停车等纵向运动",
    description: "纵向控制是PNC系统控制层的另一个基本维度，负责控制车辆的加速和减速，使车辆维持目标速度或与前车保持安全距离。纵向控制的核心挑战在于：刹车时机的精确判断(既不能太晚导致危险，也不能太早导致频繁急刹)、加减速的平顺性(避免顿挫感)、以及对前车行为的快速响应。ACC(自适应巡航)是纵向控制最典型的应用。",
    keyPoints: [
      "控制油门/刹车，实现跟车/定速/减速停车",
      "核心应用：ACC自适应巡航",
      "难点：刹车时机判断/加减速平顺性/前车响应速度",
      "评价指标：跟车距离保持/加速平顺性/刹车舒适度"
    ],
    relatedTerms: ["pnc", "acc", "lateral_control"],
  },
  {
    id: "coupled_control",
    name: "横纵耦合控制",
    aliases: ["Coupled Control", "横纵向协同"],
    category: "控制",
    difficulty: 3,
    summary: "复杂场景下横向和纵向控制的协同优化，如弯道减速、变道加速",
    description: "横纵耦合控制是指在某些复杂驾驶场景中，横向和纵向控制不能独立处理，需要联合优化。例如：弯道中需要同时减速(纵向)和转向(横向)；紧急变道时需要同时加速(纵向)和大幅度转向(横向)。传统架构中横向和纵向分别控制可能导致协调不良(如弯道中转向了但没减速)，MPC方法天然适合处理横纵耦合问题，因为它可以同时优化多个控制变量。",
    keyPoints: [
      "弯道减速、紧急变道等场景需要横纵向同时调整",
      "传统分离控制可能导致协调不良",
      "MPC天然适合横纵耦合：同时优化多个控制变量",
      "端到端方案天然实现横纵耦合(网络同时输出转角和加减速)"
    ],
    relatedTerms: ["pnc", "mpc", "lateral_control", "longitudinal_control"],
  },
  {
    id: "pid",
    name: "PID控制",
    aliases: ["PID Control", "比例积分微分控制"],
    category: "控制",
    difficulty: 1,
    summary: "工业界最经典的闭环控制算法，通过比例、积分、微分三个环节消除误差",
    description: "PID控制是最基础也最广泛使用的闭环控制算法，通过比例(P)、积分(I)、微分(D)三个环节的组合来消除期望值和实际值之间的误差。在自动驾驶中，PID常用于底层横向/纵向控制。优点是结构简单、参数调试直观、计算量小；缺点是无法显式处理约束(如最大转向角)、对非线性系统控制效果有限、参数在不同工况下可能需要调整。",
    keyPoints: [
      "P(比例)：响应当前误差，误差大则控制量大",
      "I(积分)：消除稳态误差，但可能引入超调",
      "D(微分)：预测误差变化趋势，抑制振荡",
      "优点：简单/直观/计算量小",
      "缺点：无法处理约束/非线性差/参数需调试"
    ],
    relatedTerms: ["mpc", "lateral_control", "longitudinal_control"],
  },

  // ========== 定位 ==========
  {
    id: "gnss",
    name: "GNSS",
    aliases: ["Global Navigation Satellite System", "全球导航卫星系统", "GPS", "北斗"],
    category: "定位",
    difficulty: 1,
    summary: "通过接收多颗卫星信号计算车辆位置的定位系统，RTK技术可达厘米级精度",
    description: "GNSS（全球导航卫星系统）包括美国的GPS、中国的北斗、欧洲的伽利略和俄罗斯的格洛纳斯。在自动驾驶中，GNSS配合RTK(实时动态差分)技术，通过基准站修正误差，可实现厘米级定位精度。GNSS-RTK通常与惯导系统组合使用，以应对卫星信号遮挡(隧道、高架)和中断的情况。GNSS的局限在于：城市峡谷中信号多径效应严重、室内和隧道中完全失效。",
    keyPoints: [
      "四大系统：GPS/北斗/伽利略/格洛纳斯",
      "RTK差分技术可达厘米级精度",
      "与惯导组合使用：GNSS提供绝对位置，惯导提供高频增量",
      "局限：城市峡谷多径效应/隧道室内失效",
      "无图方案中GNSS定位权重降低，更多依赖视觉定位"
    ],
    relatedTerms: ["ins", "hd_map", "localization"],
    evolution: "从有图方案依赖GNSS定位→无图方案更多依赖视觉定位，GNSS作为补充"
  },
  {
    id: "ins",
    name: "INS",
    aliases: ["Inertial Navigation System", "惯性导航系统", "惯导", "IMU"],
    category: "定位",
    difficulty: 2,
    summary: "通过加速度计和陀螺仪积分推算车辆位置和姿态，不依赖外部信号",
    description: "INS（惯性导航系统）通过积分加速度计和陀螺仪的数据来推算车辆的位置、速度和姿态变化。优点是更新频率高(100-200Hz)、不受外部信号干扰；缺点是误差随时间累积(漂移)，长时间使用后定位精度会持续下降。因此INS通常与GNSS组合：GNSS提供绝对位置修正，INS提供高频短时精确定位。高精度INS(战术级/导航级)成本高昂，是量产方案的重要成本因素。",
    keyPoints: [
      "优点：高频(100-200Hz)/不受外部信号干扰/短期精度高",
      "缺点：误差随时间累积(漂移)，需要GNSS定期修正",
      "GNSS+INS组合定位是主流方案",
      "高精度INS成本高，是量产方案的重要BOM因素",
      "隧道/地下车库中INS是唯一的定位手段"
    ],
    relatedTerms: ["gnss", "localization"],
  },
  {
    id: "hd_map",
    name: "高精地图",
    aliases: ["HD Map", "High Definition Map", "高精度地图"],
    category: "定位",
    difficulty: 2,
    summary: "厘米级精度的道路信息地图，包含车道线、交通标志、曲率等丰富语义信息",
    description: "高精地图是自动驾驶的核心支撑技术，提供超视距的先验信息。与传统导航地图(米级精度)不同，高精地图精度达到厘米级，包含四层信息：道路层(几何/属性)、定位层(标志物)、语义层(车道连接/交通规则)、动态层(实时交通事件)。高精地图的作用包括：定位(与实时感知匹配确定位置)、规划(提前知道路况做决策)、感知(超视距信息补充)、安全(传感器失效时的备选)。",
    keyPoints: [
      "精度：厘米级(远超导航地图的米级)",
      "四层结构：道路层/定位层/语义层/动态层",
      "四大作用：定位/规划/感知补充/安全备选",
      "SD地图=日常导航，不参与车道级定位和决策",
      "成本高/更新难是核心痛点",
    ],
    relatedTerms: ["gnss", "ins", "localization", "sd_map"],
    evolution: "行业趋势：重地图(百度)→轻地图(华为'无图')→无地图(特斯拉纯视觉)。无图方案通过实时感知替代地图先验，降低成本和鲜度问题",
    controversy: "有图vs无图是行业最大争议之一：有图派认为地图提供安全冗余和超视距信息，无图派认为地图成本高、更新慢、覆盖率有限"
  },
  {
    id: "sd_map",
    name: "SD地图",
    aliases: ["Standard Definition Map", "标准地图", "导航地图"],
    category: "定位",
    difficulty: 1,
    summary: "传统导航地图，精度在米级，用于日常路线规划，不参与车道级定位和决策",
    description: "SD地图（标准地图）是日常使用的导航地图(如高德/百度地图)，精度通常在米级。SD地图只包含道路级别信息(道路形状/限速/拥堵)，不包含车道级细节。在智驾系统中，SD地图仅用于全局路线规划(任务规划层)，不参与车道级定位和实时决策。与高精地图的区别：精度差2个数量级、信息丰富度差距巨大、更新频率不同。",
    keyPoints: [
      "精度：米级(远低于高精地图的厘米级)",
      "用途：仅全局路线规划，不参与车道级定位/决策",
      "常见SD地图：高德/百度/谷歌地图",
      "与HD Map区别：精度/信息量/更新频率/用途完全不同"
    ],
    relatedTerms: ["hd_map", "task_planning"],
  },
  {
    id: "localization",
    name: "多源融合定位",
    aliases: ["Multi-source Fusion Localization", "组合定位", "SLAM"],
    category: "定位",
    difficulty: 2,
    summary: "融合GNSS、惯导、视觉、激光雷达、高精地图等多种定位源的综合定位方案",
    description: "自动驾驶定位系统通常采用多源融合的方式，结合GNSS绝对定位、INS高频推算、视觉/激光雷达特征匹配定位、高精地图匹配定位等多种技术手段，实现全天候、全场景的厘米级定位。融合算法通常使用扩展卡尔曼滤波(EKF)或因子图优化。不同定位源各有优劣：GNSS在开阔处精确但遮挡处失效，INS短时精确但长期漂移，视觉定位在特征丰富时有效但特征缺失时失败。多源融合的核心就是互补。",
    keyPoints: [
      "核心思路：多种定位源互补，覆盖彼此盲区",
      "GNSS：开阔处厘米级，遮挡处失效",
      "INS：短时高频精确，长期累积漂移",
      "视觉/激光匹配：特征丰富时有效，特征缺失时失败",
      "融合算法：EKF/因子图优化"
    ],
    relatedTerms: ["gnss", "ins", "hd_map", "slam"],
  },

  // ========== 通信 ==========
  {
    id: "v2x",
    name: "V2X",
    aliases: ["Vehicle to Everything", "车联网", "车路协同"],
    category: "通信",
    difficulty: 2,
    summary: "车辆与周围环境进行信息交换的技术体系，突破单车感知局限实现超视距信息获取",
    description: "V2X（Vehicle to Everything）是实现智能网联汽车的关键使能技术，包括四种通信模式：V2V(车与车，碰撞预警/协同换道)、V2I(车与基础设施，信号灯预警/绿波通行)、V2P(车与行人，行人保护预警)、V2N(车与网络，实时路况/远程诊断)。V2X的核心价值在于突破单车感知的局限性，获取超视距信息，提升安全性和效率。中国C-V2X(蜂窝车联网)标准走在全球前列。",
    keyPoints: [
      "V2V：车与车直接通信(碰撞预警/协同换道)",
      "V2I：车与路侧单元通信(信号灯预警/绿波通行)",
      "V2P：车与行人设备通信(行人保护预警)",
      "V2N：车与云端通信(实时路况/远程诊断)",
      "中国C-V2X标准全球领先，5G部署加速V2X落地"
    ],
    relatedTerms: ["lidar", "radar"],
    evolution: "从DSRC(专用短程通信)向C-V2X(蜂窝车联网)统一，5G低延迟推动V2X实时应用"
  },

  // ========== 架构 (补充) ==========
  {
    id: "god",
    name: "GOD",
    aliases: ["General Obstacle Detection", "通用障碍物检测", "通用障碍物识别"],
    category: "架构",
    difficulty: 2,
    summary: "不预设障碍物类别，直接判断区域是否可通行的检测方法",
    description: "GOD（General Obstacle Detection）是一种不依赖预定义障碍物类别的检测方法。传统的障碍物检测需要预设类别(车/行人/锥桶等)，对于训练数据中未见过的物体(如散落的货物、异形障碍物)可能漏检。GOD不预设类别，而是直接判断某个区域是否可通行——如果前方区域与周围路面特征不同，就标记为障碍物。华为ADS是GOD方法的典型代表，其网络可以识别白名单之外的异形障碍物。",
    keyPoints: [
      "与传统方法区别：不预设类别，直接判断可通行性",
      "解决长尾问题：训练数据未覆盖的异形障碍物也能识别",
      "华为ADS是GOD的典型代表",
      "本质是 occupancy network(占用网络)的思路",
      "白名单机制是GOD的补充：已确认可信的障碍物类型"
    ],
    relatedTerms: ["bev", "e2e", "planning"],
    relatedBrands: ["huawei"],
  },
  {
    id: "override",
    name: "Override",
    aliases: ["接管", "驾驶员接管", "人为干预"],
    category: "评测",
    difficulty: 1,
    summary: "驾驶员主动干预自动驾驶系统的控制行为，是评价系统可靠性的核心指标",
    description: "Override(接管)是指驾驶员主动介入驾驶控制的行为，通常发生在系统无法正确处理当前场景时。Override分为纵向接管(踩油门/刹车)和横向接管(转方向盘超过阈值)。关键指标包括接管率(总里程/接管次数=MPI)、接管时长(驾驶员接管了多久)、接管意图(不舒适/不信任/想自己开)。Override数据采集时需记录场景、原因、接管前后状态，用于分析系统不足并优化算法。",
    keyPoints: [
      "纵向Override：踩油门/刹车",
      "横向Override：转方向盘超过阈值",
      "关键指标：接管率(MPI)/接管时长/接管意图",
      "安全接管vs效率接管：出于安全考虑vs通行效率考虑",
      "数据采集：记录场景/原因/前后状态，用于算法优化"
    ],
    relatedTerms: ["mpi", "mcp", "takeover"],
  },
  {
    id: "sr",
    name: "SR",
    aliases: ["Situation Recognition", "态势感知", "环境感知显示"],
    category: "人机",
    difficulty: 1,
    summary: "将传感器处理后的信息渲染为可视化界面，让用户看到'系统看到了什么'",
    description: "SR（Situation Recognition）是智驾系统与驾驶员之间的关键交互界面。它将摄像头、激光雷达等传感器处理后的信息，渲染为驾驶员可理解的可视化界面(通常在中控屏或SR-HUD上)，包括周围车辆位置/速度/意图、道路结构、交通信号等。SR的核心价值是让用户看到'系统看到了什么'，增强对自动驾驶系统的信任感。SR的准确性和实时性直接影响用户体验——如果SR显示与实际不符，会严重降低信任。",
    keyPoints: [
      "本质：智驾系统与驾驶员之间的'翻译官'",
      "显示内容：周围车辆/道路结构/交通信号/天气状况",
      "核心价值：让用户看到系统看到了什么，增强信任",
      "SR准确性直接影响信任感——显示与实际不符会严重降低信任",
      "华为的SR渲染被行业公认为最精细之一"
    ],
    relatedTerms: ["hmi", "override"],
    relatedBrands: ["huawei", "tesla"],
  },
  {
    id: "hmi",
    name: "HMI",
    aliases: ["Human-Machine Interface", "人机交互界面", "人机界面"],
    category: "人机",
    difficulty: 1,
    summary: "智驾系统与驾驶员之间的信息交换界面，包括仪表盘、中控屏、HUD、声音、震动",
    description: "HMI（人机交互界面）是自动驾驶车辆与驾乘人员之间信息交换的桥梁。智驾HMI包括车内显示界面(仪表盘/中控屏/HUD抬头显示)和接管提醒机制(视觉闪烁/听觉警报/触觉震动)。优秀的HMI设计需要在信息传递有效性和驾驶安全性之间平衡——既要让用户了解系统状态，又不能过度干扰注意力。L3级别HMI还需设计接管请求(Takeover Request)的分级提醒策略。",
    keyPoints: [
      "显示界面：仪表盘/中控屏/HUD抬头显示",
      "提醒方式：视觉(图标闪烁)/听觉(警报音/语音)/触觉(座椅/方向盘震动)",
      "核心设计原则：有效传递信息但不干扰驾驶注意力",
      "L3的HMI需设计分级接管提醒策略",
      "SR(态势感知)是HMI的核心组件之一"
    ],
    relatedTerms: ["sr", "override", "takeover"],
  },

  // ========== 开发 ==========
  {
    id: "data_loop",
    name: "数据闭环",
    aliases: ["Data Loop", "数据飞轮", "数据闭环体系"],
    category: "开发",
    difficulty: 2,
    summary: "持续的数据采集→分析→优化→验证循环，是自动驾驶算法迭代的核心方法论",
    description: "数据闭环是自动驾驶算法迭代的核心方法论，将外场实车测试与内场仿真验证紧密连接。完整流程：1)外场实车采集路测数据→2)上传云端完成数据清洗/标注/分析→3)算法迭代优化→4)内场回灌/仿真回归测试→5)多源场景构建标准化评测数据集→6)内场验证合格后外场复测→7)OTA远程升级下发→8)持续循环。通勤路线是外场数据采集的主力场景。",
    keyPoints: [
      "核心方法论：采集→分析→优化→验证→OTA→持续循环",
      "外场：真实开放道路，通勤路线是数据采集主力",
      "内场：仿真/回灌/HIL，可复现问题、回归验证",
      "评测数据集：多源筛选→标注分类→标准化→绑定指标→持续扩充",
      "通勤高频场景优先优化，用户感知最强"
    ],
    relatedTerms: ["simulation", "ota", "shadow_mode", "commuting"],
  },
  {
    id: "simulation",
    name: "仿真测试",
    aliases: ["Simulation", "Sim", "虚拟测试"],
    category: "开发",
    difficulty: 2,
    summary: "在虚拟环境中模拟各种驾驶场景进行算法验证，是内场测试的核心手段",
    description: "仿真测试是自动驾驶内场验证的核心手段，通过软件模拟各种驾驶场景来验证算法表现。仿真平台(如CARLA、VTD)可以生成多样化的交通场景、天气条件和光照变化，覆盖实车难以遇到的Corner Case。仿真测试的关键挑战是Sim2Real Gap——仿真环境与真实世界的差异，包括传感器噪声模型、交通参与者行为真实性、路面物理特性等。",
    keyPoints: [
      "核心价值：低成本覆盖Corner Case，可重复实验",
      "主流平台：CARLA(开源)/VTD(商业)/自建仿真平台",
      "关键挑战：Sim2Real Gap(仿真与现实的差距)",
      "仿真类型：软件在环(SIL)/硬件在环(HIL)/车辆在环(VIL)",
      "场景库建设：从实车数据提取→参数化→泛化生成"
    ],
    relatedTerms: ["sil", "hil", "data_loop", "sotif"],
  },
  {
    id: "sil",
    name: "SIL",
    aliases: ["Software-in-the-Loop", "软件在环测试", "MIL"],
    category: "开发",
    difficulty: 2,
    summary: "在纯软件环境中运行算法代码进行验证，是内场测试链的基础环节",
    description: "SIL（Software-in-the-Loop）是在纯软件环境中运行算法代码进行验证的测试方法。SIL不涉及真实硬件，算法代码直接在PC/服务器上运行，输入仿真数据或回灌数据，验证算法逻辑的正确性。SIL与MIL(Model-in-the-Loop)的区别：MIL验证的是Simulink等模型，SIL验证的是自动生成的C/C++代码。完整的验证链是MIL→SIL→HIL→实车，逐步提升置信度。",
    keyPoints: [
      "纯软件环境，不涉及真实硬件",
      "输入：仿真数据或实车回灌数据",
      "SIL vs MIL：MIL验证模型，SIL验证代码",
      "验证链：MIL→SIL→HIL→实车，逐步提升置信度",
      "优势：速度快/成本低/可大规模并行"
    ],
    relatedTerms: ["hil", "simulation", "data_loop"],
  },
  {
    id: "hil",
    name: "HIL",
    aliases: ["Hardware-in-the-Loop", "硬件在环测试"],
    category: "开发",
    difficulty: 2,
    summary: "在仿真环境中接入真实硬件(域控制器)进行闭环测试，验证软硬件集成效果",
    description: "HIL（Hardware-in-the-Loop）是在仿真环境中加入真实的硬件设备(通常是域控制器)进行闭环测试的方法。HIL将真实域控制器接入仿真平台，仿真平台生成传感器数据发送给域控制器，域控制器计算控制指令返回给仿真平台，形成闭环。HIL验证了算法在真实硬件上的运行效果，包括算力分配、实时性、通信延迟等SIL无法覆盖的硬件相关问题。",
    keyPoints: [
      "接入真实域控制器，仿真与硬件闭环",
      "验证SIL无法覆盖的硬件相关问题",
      "算力分配/实时性/通信延迟/接口兼容性",
      "成本高于SIL，但远低于实车测试",
      "是量产前的必要验证环节"
    ],
    relatedTerms: ["sil", "simulation", "data_loop"],
  },
  {
    id: "commuting",
    name: "通勤路线",
    aliases: ["Commuting Route", "通勤场景", "高频路线"],
    category: "开发",
    difficulty: 1,
    summary: "用户日常上下班的固定重复路线，是量产用户最主要行驶场景和数据采集主力",
    description: "通勤路线是指固定高频、日常上下班的固定重复路线，路况稳定、车流规律、场景重复度高。通勤路线是量产用户最主要行驶场景，包含常规跟车/路口/拥堵/普通变道等高频日常场景。数据重复度高、样本量大，极易形成数据闭环富集。在迭代优先级上，通勤高频场景优先优化，直接决定日常MPI和接管指标，用户感知最强。",
    keyPoints: [
      "路线固定/场景熟悉/数据重复度高",
      "外场：通勤路线是量产车数据采集主力场景",
      "内场：优先基于通勤路线构建评测数据集",
      "迭代优先级：通勤高频场景优先优化",
      "直接影响：日常MPI/接管率/用户感知"
    ],
    relatedTerms: ["data_loop", "mpi", "override"],
  },
  {
    id: "mcap",
    name: "MCAP",
    aliases: ["Message Container Archive Packet", "消息容器格式"],
    category: "开发",
    difficulty: 2,
    summary: "路测数据的标准存储格式，支持多通道时序数据(图像/点云/雷达等)",
    description: "MCAP是自动驾驶路测数据通常采用的存储格式，是一种开放的容器格式，能够存储多个通道的时序数据。MCAP格式支持多种消息类型，包括图像、点云、雷达数据等，是自动驾驶数据存储和回放的标准格式。MCAP的优势在于高效的随机访问和压缩比，支持大规模路测数据的快速回灌和检索。",
    keyPoints: [
      "开放容器格式，支持多通道时序数据",
      "消息类型：图像/点云/雷达/控制指令等",
      "优势：高效随机访问/高压缩比/快速回灌",
      "是ROS 2的默认录制格式",
      "替代了旧的bag格式"
    ],
    relatedTerms: ["ros", "data_loop"],
  },
  {
    id: "ros",
    name: "ROS",
    aliases: ["Robot Operating System", "机器人操作系统"],
    category: "开发",
    difficulty: 2,
    summary: "机器人软件开发的核心框架，自动驾驶开发中被广泛采用",
    description: "ROS是机器人软件开发的核心框架，在自动驾驶开发中被广泛采用。ROS提供丰富的工具生态(RViz可视化/Gazebo仿真)、分布式架构(支持多机协同)和庞大的社区支持。ROS的核心概念包括节点(Node)、话题(Topic)、服务(Service)和动作(Action)。ROS 2解决了ROS 1在实时性、安全性和分布式部署方面的不足，是当前自动驾驶开发的主流选择。",
    keyPoints: [
      "核心概念：节点/话题/服务/动作",
      "ROS 1→ROS 2：实时性/安全性/分布式部署改进",
      "工具生态：RViz(可视化)/Gazebo(仿真)/rqt(调试)",
      "分布式架构：支持多机协同，降低系统耦合度",
      "在自动驾驶中：感知/规划/控制各模块作为独立ROS节点"
    ],
    relatedTerms: ["simulation", "mcap"],
  },
  {
    id: "foxglove",
    name: "Foxglove",
    aliases: ["Foxglove Studio"],
    category: "开发",
    difficulty: 2,
    summary: "现代化的机器人数据可视化平台，支持数据回放、可视化分析和调试",
    description: "Foxglove是现代化的机器人数据可视化平台，提供直观的Web界面和丰富的插件生态，是自动驾驶数据分析和调试的利器。Foxglove支持MCAP/bag等数据格式的回放，可以实时显示传感器数据、规划轨迹、车辆状态等信息，支持自定义布局和面板。相比RViz，Foxglove更加轻量和易用，特别适合远程协作和云端数据分析场景。",
    keyPoints: [
      "Web界面，无需本地安装",
      "支持MCAP/bag等数据格式回放",
      "自定义布局和面板，灵活配置",
      "相比RViz更轻量/易用/适合远程协作",
      "插件生态丰富，可扩展性强"
    ],
    relatedTerms: ["ros", "mcap", "rviz"],
  },
  {
    id: "rviz",
    name: "RViz",
    aliases: ["rviz", "ROS可视化工具"],
    category: "开发",
    difficulty: 2,
    summary: "ROS官方三维可视化工具，实时显示传感器数据、规划轨迹等调试信息",
    description: "RViz是ROS官方提供的三维可视化工具，是自动驾驶开发中最常用的调试工具之一。RViz可以实时显示传感器数据(点云/图像)、规划轨迹、车辆模型、TF变换坐标系等信息，帮助开发者直观了解系统的运行状态。RViz的局限在于需要ROS环境、界面较为传统、远程访问不便，因此Foxglove等Web端工具正在成为补充。",
    keyPoints: [
      "ROS官方工具，与ROS生态深度集成",
      "实时显示：点云/图像/轨迹/坐标系",
      "通过Topic订阅实时数据流",
      "局限：需ROS环境/界面传统/远程访问不便",
      "Foxglove等Web工具正在成为补充"
    ],
    relatedTerms: ["ros", "foxglove"],
  },

  // ========== 评测 (补充) ==========
  {
    id: "mpi",
    name: "MPI",
    aliases: ["Miles Per Intervention", "每次接管里程"],
    category: "评测",
    difficulty: 1,
    summary: "总行驶里程除以接管次数，衡量智驾系统持续运行能力的核心指标",
    description: "MPI（每次接管里程）是自动驾驶行业最常用的评价指标之一，MPI越高说明系统的可靠性和稳定性越好。MPI可进一步细分：安全MPI(仅统计安全相关接管)和效率MPI(考虑通行效率的接管评价)。加州DMV年度自动驾驶报告要求企业披露MPI数据，但不同企业的统计口径和场景范围差异巨大，直接对比需谨慎。",
    keyPoints: [
      "MPI = 总里程 / 接管次数，越高越好",
      "安全MPI：仅统计安全相关接管，更客观",
      "效率MPI：考虑通行效率的综合评价",
      "加州DMV年度报告要求披露，但统计口径差异大",
      "直接对比不同企业MPI需谨慎(场景/ODD/统计口径不同)"
    ],
    relatedTerms: ["mcp", "override", "commuting"],
    controversy: "MPI的行业标准化问题：不同企业的场景范围、接管判定标准、统计口径差异巨大，横向对比需注意可比性"
  },
  {
    id: "mcp",
    name: "MCP",
    aliases: ["Miles Per Intervention Coverage", "接管里程覆盖率"],
    category: "评测",
    difficulty: 2,
    summary: "接管事件发生的路段占总里程的比例，可识别系统能力的薄弱环节",
    description: "MCP（每次接管里程覆盖率）是比MPI更细致的评价指标。MCP统计的是接管事件发生的路段占总里程的比例，而不仅仅是接管次数。MCP指标可以识别系统能力的薄弱环节——如果接管集中在某些特定路段(如复杂路口/施工区域)，说明系统在这些场景下能力不足，需要针对性优化。MCP比MPI更能反映系统的场景覆盖能力。",
    keyPoints: [
      "MCP = 接管路段 / 总里程路段，反映场景覆盖能力",
      "比MPI更细致：可识别系统能力薄弱环节",
      "接管集中区域 = 需要重点优化的场景",
      "结合通勤路线分析：通勤路段MCP更有实际意义"
    ],
    relatedTerms: ["mpi", "override", "commuting"],
  },
  {
    id: "takeover",
    name: "接管请求",
    aliases: ["Takeover Request", "TOR", "接管提醒", "接管请求"],
    category: "人机",
    difficulty: 2,
    summary: "L3级别系统在即将超出ODD时向驾驶员发出接管请求的安全机制",
    description: "接管请求(Takeover Request/TOR)是L3级别自动驾驶系统的关键安全机制。当系统检测到即将超出运行设计域(ODD)或遇到无法处理的场景时，必须向驾驶员发出接管请求，并给予足够的接管时间(通常10秒以上)。接管请求通过多模态方式传递：视觉(仪表盘图标闪烁/中控弹窗)、听觉(警报音/语音播报)、触觉(座椅震动/方向盘振动)。接管请求的设计需要在及时性和不打扰之间平衡。",
    keyPoints: [
      "L3关键安全机制：系统必须发出接管请求",
      "接管时间：通常需给予10秒以上反应时间",
      "多模态提醒：视觉+听觉+触觉三重保障",
      "设计难点：及时性vs不打扰的平衡",
      "如果驾驶员未响应：系统需进入最小风险状态(MRC)"
    ],
    relatedTerms: ["odd", "hmi", "override", "l3"],
  },

  // ========== 感知 (补充) ==========
  {
    id: "sensor_fusion",
    name: "传感器融合",
    aliases: ["Sensor Fusion", "多传感器融合", "感知融合"],
    category: "感知",
    difficulty: 2,
    summary: "整合多种传感器信息的技术，分为前融合(数据层)和后融合(目标层)",
    description: "传感器融合是提升感知系统性能的关键技术，通过充分利用不同传感器的优势实现单一传感器无法达到的效果。前融合在原始数据层面融合(将不同传感器的原始数据/早期特征统一处理)，信息保留最完整但计算量大；后融合在目标层面融合(各传感器独立检测后综合判断)，实现简单但信息损失多。当前趋势是向前融合发展——BEV感知天然适合前融合，将多摄像头/激光雷达数据在统一3D空间中融合。",
    keyPoints: [
      "前融合：数据层融合，信息完整但计算量大",
      "后融合：目标层融合，实现简单但信息损失",
      "BEV感知天然适合前融合(统一3D空间)",
      "典型优势：摄像头识颜色+激光雷达测距=互补",
      "融合难点：时空同步/标定精度/异构数据对齐"
    ],
    relatedTerms: ["bev", "lidar", "radar"],
  },
  {
    id: "vru",
    name: "VRU",
    aliases: ["Vulnerable Road User", "弱势道路使用者"],
    category: "感知",
    difficulty: 1,
    summary: "包括行人、自行车骑行者等无保护、行为随机、目标小的道路使用者",
    description: "VRU（弱势道路使用者）是指道路上缺乏物理保护的交通参与者，包括行人、自行车骑行者、电动滑板车用户等。VRU是智驾感知中最难处理的类别之一：行为随机性强(可能突然变向/横穿)、目标小(远处检测困难)、遮挡严重(被停放车辆遮挡)。E-NCAP 2026标准大幅提升了对VRU保护的要求，AEB-VRU(自动紧急制动对VRU)成为关键测试项。",
    keyPoints: [
      "定义：无保护/行为随机/目标小的道路使用者",
      "包含：行人/自行车/电动车/滑板车等",
      "检测难点：行为随机/目标小/遮挡严重",
      "E-NCAP 2026：AEB-VRU成为关键测试项",
      "夜间VRU检测是行业公认难题"
    ],
    relatedTerms: ["aeb", "prediction"],
  },
  {
    id: "corner_case",
    name: "长尾场景",
    aliases: ["Corner Case", "长尾问题", "极端场景", "Edge Case"],
    category: "评测",
    difficulty: 2,
    summary: "发生概率低但种类众多的极端驾驶场景，是智驾系统最难覆盖的部分",
    description: "长尾场景(Corner Case)是指那些发生概率很低但种类繁多的特殊驾驶场景，如道路上突然出现的动物、散落货物、交通事故现场、异形施工标志等。这些场景难以通过常规数据采集覆盖，需要专门的场景库和仿真测试来验证。长尾问题是智驾从L2到L4的核心障碍——覆盖99%的常见场景可能只需1年，但覆盖最后1%的长尾可能需要10年。影子模式和数据闭环是积累长尾场景数据的主要手段。",
    keyPoints: [
      "低概率但高危害：种类无限多，单个出现概率极低",
      "覆盖99%常见场景容易，最后1%极难",
      "典型长尾：异形障碍物/极端天气/异常交通/施工路段",
      "解决手段：场景库建设+仿真+影子模式+数据闭环",
      "GOD(通用障碍物检测)是应对长尾的重要技术方向"
    ],
    relatedTerms: ["god", "shadow_mode", "simulation", "sotif"],
  },
  {
    id: "white_list",
    name: "白名单",
    aliases: ["White List", "可信目标列表"],
    category: "架构",
    difficulty: 1,
    summary: "经过验证的可信障碍物类别列表，与GOD互补提高识别效率和准确性",
    description: "白名单是智驾感知中经过验证的可信目标类别列表，用于障碍物识别。白名单机制可以提高识别效率和准确性，减少对已知类别目标的误识别和漏识别。白名单与GOD(通用障碍物检测)是互补关系：白名单负责高效准确识别已知类别(车/行人/锥桶等)，GOD负责识别白名单之外的未知障碍物。两者结合实现'已知精准识别+未知不遗漏'的完整感知能力。",
    keyPoints: [
      "已验证可信的障碍物类别：车/行人/骑行者/锥桶等",
      "提高已知类别的识别效率和准确性",
      "与GOD互补：白名单管已知，GOD管未知",
      "白名单会持续扩充：新发现的常见障碍物类型"
    ],
    relatedTerms: ["god", "bev"],
  },
  {
    id: "domain_controller",
    name: "域控制器",
    aliases: ["Domain Controller", "DCU", "智驾域控"],
    category: "架构",
    difficulty: 1,
    summary: "车载计算核心，集中处理感知/规划/控制等计算任务的硬件平台",
    description: "域控制器是智能汽车的'大脑'，集中处理自动驾驶的感知、规划、控制等计算任务。域控制器通常搭载高性能芯片(如NVIDIA Orin/Thor、地平线征程系列)，提供强大的算力支撑。行业趋势是从分布式ECU架构向域集中式架构演进，最终走向中央计算平台——将智驾域、座舱域、底盘域融合为一个中央计算单元。",
    keyPoints: [
      "智驾系统的硬件载体，搭载高性能AI芯片",
      "代表芯片：NVIDIA Orin(254TOPS)/Thor(700TOPS)/征程6P",
      "趋势：分布式ECU→域集中→中央计算平台",
      "L3级域控通常需要双芯片冗余设计",
      "成本和BOM是量产方案的关键考量"
    ],
    relatedTerms: ["orin_x", "thor", "journey6"],
    relatedBrands: ["tesla", "xpeng", "huawei"],
  },
  {
    id: "trigger_mechanism",
    name: "触发机制",
    aliases: ["Trigger Mechanism", "功能触发", "策略介入条件"],
    category: "架构",
    difficulty: 2,
    summary: "智驾功能策略介入的条件判断逻辑，定义系统何时激活/退出/提醒接管",
    description: "触发机制定义了自动驾驶系统在不同场景下应该如何响应，包括功能激活条件(何时可以开启)、功能退出条件(何时必须退出)、接管提醒策略(何时提醒驾驶员)等。触发机制的合理设计直接影响用户体验和安全性——过于保守的触发条件会限制功能可用性，过于激进则可能在不安全场景下开启功能。",
    keyPoints: [
      "三类条件：激活条件/退出条件/接管提醒条件",
      "过于保守→功能可用性差，过于激进→安全性风险",
      "不同级别触发条件不同：L2/L3/L4差异巨大",
      "ODD定义直接影响触发机制的边界"
    ],
    relatedTerms: ["odd", "takeover", "hmi"],
  },

  // ========== 决策 (规划与决策) ==========
  {
    id: "behavior-planning",
    name: "行为规划",
    aliases: ["Behavior Planning", "行为决策", "决策规划"],
    category: "决策",
    difficulty: 2,
    summary: "决定车辆应采取的宏观行为（跟车/换道/超车/让行/停车等），是感知到控制的关键决策层。",
    description: "行为规划负责决定车辆应该采取什么样的宏观行为，如跟车、换道、超车、让行、停车等。行为规划模块接收来自感知和预测模块的环境信息，结合道路规则和交通状况，做出高层次的驾驶决策。需要综合考虑安全性、效率性、舒适性和合法性等多个因素，是自动驾驶决策链条中的关键环节。现代行为规划系统通常采用有限状态机、决策树或基于学习的方法来实现。",
    relatedTerms: ["trajectory-planning", "motion-control", "pnc", "fsm"],
    evolution: "从规则驱动(有限状态机)→数据驱动(模仿学习)→端到端(直接感知到动作)",
    controversy: "端到端方案中行为规划是否还需要独立存在，还是被神经网络隐式处理"
  },
  {
    id: "trajectory-planning",
    name: "轨迹规划",
    aliases: ["Trajectory Planning", "路径规划", "路径生成"],
    category: "决策",
    difficulty: 2,
    summary: "生成满足行为决策的详细行驶轨迹（位置/速度/加速度随时间变化的曲线），是行为规划到运动控制的桥梁。",
    description: "轨迹规划负责生成满足行为决策的详细行驶轨迹，包括位置、速度、加速度等随时间变化的曲线。需要满足安全性约束（不发生碰撞、不越过道路边界）、运动学约束（车辆物理特性限制）和动力学约束（加速度、曲率限制）。常用算法包括基于采样的方法（RRT、RRT*）、基于搜索的方法（A*、Hybrid A*）和基于优化的方法（模型预测控制）。",
    relatedTerms: ["behavior-planning", "motion-control", "mpc", "rrt", "hybrid-astar"],
    evolution: "基于规则→基于优化(MPC/QP)→数据驱动(神经网络轨迹生成)"
  },
  {
    id: "motion-control",
    name: "运动控制",
    aliases: ["Motion Control", "车辆控制", "底层控制"],
    category: "控制",
    difficulty: 2,
    summary: "将规划轨迹转化为具体的车辆控制指令（方向盘转角/油门开度/刹车力度），直接与车辆执行器交互。",
    description: "运动控制将规划轨迹转化为具体的车辆控制指令，如方向盘转角、油门开度、刹车力度等。运动控制是自动驾驶系统的最底层，直接与车辆执行器交互。需要根据轨迹规划输出的目标轨迹，计算出精确的控制指令并下发到车辆的转向、驱动、制动系统。常用控制方法包括PID控制、模型预测控制（MPC）和自适应控制等。高性能的运动控制系统需要准确理解车辆动力学特性，并能够适应不同路况和驾驶风格的差异。",
    relatedTerms: ["trajectory-planning", "mpc", "pid", "lateral-control", "longitudinal-control"],
    controversy: "端到端方案是否还需要显式的运动控制层"
  },
  {
    id: "pnc",
    name: "规划与控制 (PNC)",
    aliases: ["Planning and Control", "规控", "P&C"],
    category: "决策",
    difficulty: 1,
    summary: "规划(Planning)与控制(Control)的合称，规划生成路径，控制执行路径，是智驾系统的核心模块。",
    description: "PNC是规划(Planning)与控制(Control)的合称，是自动驾驶系统从感知到执行的核心链路。\n\n规划包含三个层次：\n• 任务规划：全局路线规划（从A到B的最优路径）\n• 行为规划：决定做什么动作（换道/超车/让行）\n• 轨迹规划：生成具体行驶轨迹（位置+速度+时间）\n\n控制也包含两个维度：\n• 横向控制：控制方向盘，保持车道、变道\n• 纵向控制：控制油门刹车，保持车距、加减速\n• 横纵耦合：复杂场景横向纵向协同控制\n\nPNC的质量直接决定智驾体验：安全、舒适、高效。",
    relatedTerms: ["behavior-planning", "trajectory-planning", "motion-control", "lateral-control", "longitudinal-control"],
  },
  {
    id: "lateral-control",
    name: "横向控制",
    aliases: ["Lateral Control", "转向控制", "方向盘控制"],
    category: "控制",
    difficulty: 1,
    summary: "控制方向盘转角，实现车道保持、变道、转弯等横向运动，是智驾控制的核心维度之一。",
    description: "横向控制负责控制车辆的转向，实现车道保持、变道、转弯等操作。横向控制的核心是根据规划轨迹计算方向盘转角，使车辆沿目标路径行驶。常用方法包括Stanley控制器（基于前轮转角）、Pure Pursuit（纯追踪）和MPC。横向控制的关键挑战包括低速大曲率转弯、湿滑路面附着力不足、高速稳定性等。",
    relatedTerms: ["longitudinal-control", "motion-control", "pnc"],
    commonMisconception: "横向控制不只是'打方向盘'，还需要考虑车辆动力学、轮胎侧偏特性、路面附着系数等"
  },
  {
    id: "longitudinal-control",
    name: "纵向控制",
    aliases: ["Longitudinal Control", "加减速控制", "油门刹车控制"],
    category: "控制",
    difficulty: 1,
    summary: "控制油门和刹车，实现跟车、定速、加减速等纵向运动，是智驾控制的另一核心维度。",
    description: "纵向控制负责控制车辆的加减速，实现跟车、定速巡航、自动紧急制动等操作。纵向控制的核心是根据规划的速度曲线计算油门开度和刹车力度，使车辆达到目标速度和车距。常用方法包括PID控制和级联PID（速度环+加速度环）。纵向控制的关键挑战包括坡道起步、低速蠕行、紧急制动距离估算等。",
    relatedTerms: ["lateral-control", "motion-control", "pnc", "acc"],
    commonMisconception: "纵向控制的难点不是'踩油门刹车'，而是精准估算制动距离、保证舒适性的同时不牺牲安全性"
  },
  {
    id: "fsm",
    name: "有限状态机",
    aliases: ["Finite State Machine", "FSM", "状态机"],
    category: "决策",
    difficulty: 1,
    summary: "行为规划的经典实现方式，通过定义有限个状态和状态间的转换条件来决策车辆行为。",
    description: "有限状态机是行为规划最经典的实现方式，通过定义有限个状态（如跟车、换道左、换道右、超车等）和状态间的转换条件（如前车速度低于阈值→触发换道），来实现车辆行为决策。FSM的优点是逻辑清晰、可解释性强、容易调试；缺点是状态数量随场景复杂度指数增长、难以覆盖所有Corner Case、状态间转换条件维护成本高。现代方案正在向数据驱动和端到端方向演进。",
    relatedTerms: ["behavior-planning", "pnc"],
    evolution: "FSM→分层FSM→决策树→强化学习→端到端"
  },
  {
    id: "mpc",
    name: "模型预测控制 (MPC)",
    aliases: ["Model Predictive Control", "MPC控制", "滚动优化控制"],
    category: "控制",
    difficulty: 3,
    summary: "通过建立车辆动力学模型，在每个时刻求解未来有限时域内的最优控制序列，取第一个控制量执行，滚动推进。",
    description: "MPC是轨迹规划和运动控制中广泛使用的高级控制方法。核心思想是在每个控制时刻：1）基于当前状态和动力学模型预测未来行为；2）在约束条件（加速度限制、曲率限制、碰撞避免等）下求解最优控制序列；3）只执行第一个控制量，下一时刻重新求解（滚动优化）。\n\nMPC的优势：能显式处理约束、可同时优化轨迹和控制、适合多目标权衡（安全+舒适+效率）。\n\nMPC的局限：计算量大（需在线求解优化问题）、对模型精度敏感、实时性要求高。\n\n在智驾中，MPC常用于轨迹规划和横向-纵向联合控制，是当前量产方案的主力算法。",
    relatedTerms: ["trajectory-planning", "motion-control", "pid"],
    evolution: "线性MPC→非线性MPC(NMPC)→数据驱动MPC(结合学习)",
    controversy: "MPC vs 端到端：MPC可解释但需要精确模型，端到端灵活但不可解释"
  },
  {
    id: "rrt",
    name: "快速随机树 (RRT)",
    aliases: ["Rapidly-exploring Random Tree", "RRT*", "随机采样规划"],
    category: "决策",
    difficulty: 2,
    summary: "基于随机采样的路径规划算法，通过在配置空间中随机生长树结构来搜索可行路径，适合高维空间。",
    description: "RRT是一种基于采样的路径规划算法，通过在配置空间中随机采样点并向最近节点扩展，逐步构建搜索树来探索可行路径。RRT的优势在于不需要对空间进行完整建模，适合处理高维空间和复杂约束的规划问题。RRT*是RRT的优化版本，通过重连操作保证渐进最优性。在自动驾驶中，RRT常用于泊车路径规划和避障路径搜索，但在高速场景中较少使用，因为随机性导致轨迹不够平滑。",
    relatedTerms: ["trajectory-planning", "hybrid-astar"],
  },
  {
    id: "hybrid-astar",
    name: "混合A*算法",
    aliases: ["Hybrid A*", "Hybrid A-star"],
    category: "决策",
    difficulty: 2,
    summary: "结合A*搜索与车辆运动学约束的路径规划算法，生成的路径满足车辆最小转弯半径等物理约束。",
    description: "Hybrid A*是在经典A*算法基础上引入车辆运动学约束的路径规划算法。传统A*在离散网格上搜索，生成的路径不满足车辆运动学约束（如最小转弯半径）；Hybrid A*则在连续空间中考虑车辆运动学模型进行扩展，生成的路径可以直接被车辆执行。Hybrid A*广泛应用于自动泊车路径规划，是量产泊车系统的核心算法之一。",
    relatedTerms: ["trajectory-planning", "rrt"],
  },
  {
    id: "pid",
    name: "PID控制",
    aliases: ["Proportional-Integral-Derivative", "比例积分微分控制"],
    category: "控制",
    difficulty: 1,
    summary: "最经典的反馈控制算法，通过比例(P)、积分(I)、微分(D)三个环节的组合来消除误差，广泛用于纵向控制和横向控制。",
    description: "PID控制是最经典的反馈控制算法，由比例(P)、积分(I)、微分(D)三个环节组成：\n• P（比例）：按误差大小成比例输出，误差大则纠正大\n• I（积分）：累积历史误差消除稳态误差\n• D（微分）：根据误差变化率提前预判，抑制超调\n\n在智驾中，PID常用于纵向控制（速度跟踪、车距保持）和简单横向控制。优点是简单可靠、无需精确模型；缺点是参数调试依赖经验、对非线性系统效果有限、难以显式处理约束。MPC逐渐取代PID成为主流。",
    relatedTerms: ["mpc", "motion-control", "lateral-control", "longitudinal-control"],
    evolution: "PID→级联PID→自适应PID→MPC"
  },

  // ========== 定位系统 ==========
  {
    id: "gnss",
    name: "全球导航卫星系统 (GNSS)",
    aliases: ["Global Navigation Satellite System", "GPS", "北斗", "卫星定位"],
    category: "定位",
    difficulty: 1,
    summary: "通过接收多颗卫星信号计算接收机位置，结合RTK差分定位技术可达厘米级精度，是智驾定位的基础。",
    description: "GNSS通过接收多颗卫星信号计算接收机位置。常见系统包括美国GPS、中国北斗、欧洲伽利略和俄罗斯格洛纳斯。通过RTK（实时动态差分）技术，在已知位置的基准站计算定位误差并实时发送给移动站，可将定位精度从米级提升至厘米级。在自动驾驶中，GNSS-RTK通常与惯性导航系统结合使用，以应对卫星信号遮挡（隧道、高楼区）和中断的情况。GNSS的局限包括信号遮挡、多径效应、更新频率低（通常10Hz）等。",
    relatedTerms: ["ins", "rtk", "hd-map"],
    commonMisconception: "GNSS ≠ GPS，GPS只是GNSS的一种，北斗是中国的GNSS系统"
  },
  {
    id: "rtk",
    name: "实时动态差分 (RTK)",
    aliases: ["Real-Time Kinematic", "差分定位", "RTK定位"],
    category: "定位",
    difficulty: 2,
    summary: "通过基准站与移动站的差分修正，将GNSS定位精度从米级提升至厘米级，是高精定位的关键技术。",
    description: "RTK通过在已知精确位置的基准站接收卫星信号，计算出定位误差修正值，实时发送给移动站（车辆），从而实现厘米级的高精度定位。RTK定位精度可达1-3cm，是自动驾驶高精定位的核心技术之一。但RTK需要基准站支持（可自建或使用CORS网络），且在卫星信号遮挡区域（隧道、地下车库）无法工作，需要与INS组合使用。",
    relatedTerms: ["gnss", "ins"],
  },
  {
    id: "ins",
    name: "惯性导航系统 (INS)",
    aliases: ["Inertial Navigation System", "惯导", "IMU+INS"],
    category: "定位",
    difficulty: 2,
    summary: "通过积分加速度计和陀螺仪数据推算位置和姿态，不依赖外部信号，是GNSS定位的重要补充。",
    description: "INS通过积分加速度计和陀螺仪的数据来推算车辆的位置和姿态变化。INS具有更新频率高（可达100-200Hz）、不受外部信号影响等优点，是GNSS定位的重要补充。在GNSS信号良好时，INS可以平滑定位结果；在GNSS信号中断时（隧道、高楼遮挡），INS可以短时间内维持定位输出。但INS的定位误差会随时间累积（漂移），长时间使用后精度下降，因此需要与GNSS组合使用。\n\n高精度INS（战术级/导航级）对于L3+自动驾驶至关重要，但成本较高（数千至数万元）。",
    relatedTerms: ["gnss", "rtk", "imu"],
    commonMisconception: "IMU ≠ INS，IMU是传感器（加速度计+陀螺仪），INS是包含解算算法的完整系统"
  },
  {
    id: "imu",
    name: "惯性测量单元 (IMU)",
    aliases: ["Inertial Measurement Unit", "惯测单元"],
    category: "传感器",
    difficulty: 1,
    summary: "包含三轴加速度计和三轴陀螺仪的传感器，测量线加速度和角速度，是惯导系统(INS)的核心传感器。",
    description: "IMU是惯性导航系统的核心传感器，通常包含6个自由度的测量：三轴加速度计测量线加速度，三轴陀螺仪测量角速度。IMU的数据经过积分运算可以得到速度、位置和姿态信息。根据精度等级，IMU可分为消费级（手机用，几元）、工业级（百元级）和战术级/导航级（千元至万元级），自动驾驶通常需要工业级以上的IMU。",
    relatedTerms: ["ins", "gnss"],
  },
  {
    id: "hd-map",
    name: "高精地图 (HD Map)",
    aliases: ["High Definition Map", "高精度地图", "厘米级地图"],
    category: "定位",
    difficulty: 1,
    summary: "精度达厘米级的道路信息地图，包含车道线、交通标志、曲率等丰富语义，为定位、规划、感知提供先验信息。",
    description: "HD Map是自动驾驶的核心支撑技术，提供超视距的先验信息。与SD地图（标准导航地图，米级精度）不同，HD Map精度达厘米级，包含多层信息：\n\n• 道路层：道路几何信息、属性（限速、道路类型）\n• 定位层：用于定位的标志物（电线杆、交通标志、路面标记）\n• 语义层：车道连接关系、交通规则、信号灯相位\n• 动态层：实时交通信息、动态事件\n\nHD Map的核心作用：\n1. 定位：与实时感知匹配，厘米级定位\n2. 规划：提前知道路况，提前决策\n3. 感知：超视距信息补充，弥补传感器局限\n4. 安全：传感器失效时的备选\n\n当前争议：无图方案（不依赖高精地图）vs 有图方案，端到端方案是否还需要高精地图。",
    relatedTerms: ["gnss", "sd-map", "lane-detection"],
    evolution: "有图方案→轻地图→无图方案",
    controversy: "无图派认为高精地图维护成本高、更新慢；有图派认为地图是不可替代的安全冗余"
  },
  {
    id: "sd-map",
    name: "标准地图 (SD Map)",
    aliases: ["Standard Definition Map", "导航地图", "普通地图"],
    category: "定位",
    difficulty: 1,
    summary: "传统导航地图，精度通常在米级，用于日常导航，不参与车道级精确定位和决策。",
    description: "SD Map是传统导航地图，精度通常在米级，包含道路网络、POI兴趣点等基本信息。SD Map用于日常导航路线规划，但不参与车道级精确定位和自动驾驶决策。与HD Map的关键区别：SD Map只知道'这条路'，HD Map知道'这条车道'。",
    relatedTerms: ["hd-map"],
  },

  // ========== 车联网通信 ==========
  {
    id: "v2x",
    name: "车联网通信 (V2X)",
    aliases: ["Vehicle to Everything", "车路协同", "V2V", "V2I"],
    category: "通信",
    difficulty: 2,
    summary: "车辆与周围环境进行信息交换的技术体系，突破单车感知局限，实现超视距信息获取。",
    description: "V2X是车辆与周围环境进行信息交换的技术体系，是实现智能网联汽车的关键使能技术。包含四种通信模式：\n\n• V2V（车与车）：交换位置/速度/方向，实现碰撞预警、协同换道\n• V2I（车与基础设施）：与路侧单元交换信号灯/路况，实现信号灯预警、绿波通行\n• V2P（车与行人）：与行人设备通信，实现行人保护预警\n• V2N（车与网络）：与云端通信，实现实时路况、远程诊断\n\nV2X通信标准：C-V2X（蜂窝V2X，基于5G/LTE）和DSRC（专用短程通信）。中国主推C-V2X。\n\nV2X的挑战：覆盖率低、路侧设备不足、标准不统一、商业模式不清。",
    relatedTerms: ["c-v2x", "dsrc"],
    evolution: "DSRC→C-V2X(LTE)→C-V2X(5G NR)",
  },
  {
    id: "c-v2x",
    name: "蜂窝车联网 (C-V2X)",
    aliases: ["Cellular V2X", "基于蜂窝的V2X"],
    category: "通信",
    difficulty: 2,
    summary: "基于蜂窝移动通信技术的V2X方案，中国主推路线，支持直连通信(PC5)和网络通信(Uu)两种模式。",
    description: "C-V2X是基于蜂窝移动通信（4G LTE/5G NR）的V2X技术，是中国主推的V2X标准。支持两种通信模式：\n• PC5直连模式：车辆之间直接通信，不经过基站，低延迟\n• Uu网络模式：通过基站/网络通信，覆盖范围大\n\nC-V2X相比DSRC的优势：与5G网络协同演进、更大带宽、更好兼容性。",
    relatedTerms: ["v2x"],
  },

  // ========== 开发体系 ==========
  {
    id: "data-closed-loop",
    name: "数据闭环",
    aliases: ["Data Loop", "数据飞轮", "数据驱动闭环"],
    category: "开发",
    difficulty: 2,
    summary: "通过持续的数据采集→分析→优化→验证循环，提升系统性能，是自动驾驶算法迭代的核心方法论。",
    description: "数据闭环是自动驾驶算法迭代的核心方法论。完整流程：\n1. 外场实车采集路测数据（含通勤路线）\n2. 上传云端完成数据清洗、标注分析\n3. 算法迭代优化\n4. 内场回灌、仿真工具回归测试\n5. 多源场景构建标准化评测数据集\n6. 内场验证合格后外场实车复测\n7. OTA远程升级下发至车辆\n8. 持续循环迭代\n\n数据闭环的核心价值在于将真实道路场景持续转化为算法改进，形成'数据飞轮'效应——数据越多→系统越好→用户越多→数据更多。",
    relatedTerms: ["shadow-mode", "ota", "simulation", "commute-route"],
  },
  {
    id: "commute-route",
    name: "通勤路线",
    aliases: ["Commuting Route", "高频通勤", "上下班路线"],
    category: "开发",
    difficulty: 1,
    summary: "用户日常上下班的固定高频重复路线，是量产数据采集主力场景和用户体验核心指标。",
    description: "通勤路线是固定高频、日常上下班的固定重复路线，路况稳定、车流规律、场景重复度高。特点：\n\n• 路线固定、场景熟悉：跟车、路口、拥堵、变道等高频日常场景\n• 数据重复度高、样本量大：极易形成数据闭环富集\n• 直接影响用户日常体验：安全、效率、安心感、舒适感\n\n在开发中的作用：\n• 外场：通勤路线是量产车数据采集主力场景\n• 内场：优先基于通勤路线典型场景构建评测数据集\n• 迭代优先级：通勤高频场景优先优化，用户感知最强",
    relatedTerms: ["data-closed-loop", "mpi", "override"],
  },
  {
    id: "simulation",
    name: "仿真测试",
    aliases: ["Simulation", "虚拟测试", "Sim测试"],
    category: "评测",
    difficulty: 2,
    summary: "在虚拟环境中模拟各种驾驶场景进行算法验证，是自动驾驶开发的核心测试手段之一。",
    description: "仿真测试通过软件模拟各种驾驶场景，验证算法在不同条件下的表现。核心挑战是Sim2Real Gap——仿真与真实世界的差异。\n\n仿真测试类型：\n• SIL（软件在环）：纯软件仿真，算法在虚拟环境中运行\n• HIL（硬件在环）：加入真实ECU/传感器硬件\n• VIL（车辆在环）：整车在台架上的闭环测试\n\n常用仿真平台：CARLA、LGSVL、PreScan等。\n\n仿真的优势：场景可重复、风险可控、成本低、可覆盖Corner Case。\n仿真的局限：无法完全模拟真实世界复杂性，需与实车测试互补。",
    relatedTerms: ["sil", "hil", "sim2real", "data-closed-loop"],
    commonMisconception: "仿真不能替代实车测试，Sim2Real Gap是行业难题"
  },
  {
    id: "sil",
    name: "软件在环测试 (SIL)",
    aliases: ["Software-in-the-Loop", "SIL测试"],
    category: "评测",
    difficulty: 2,
    summary: "纯软件层面的闭环仿真测试，算法代码在PC上运行并与仿真环境交互，是最基础的仿真测试方式。",
    description: "SIL测试是在纯软件环境中运行算法代码，与仿真环境形成闭环。SIL是MIL(模型在环)→SIL→HIL(硬件在环)→VIL(车辆在环)验证链中的一环。SIL的优势是速度快、成本低、易于并行；局限是无法验证硬件相关的问题（时序、资源竞争等）。",
    relatedTerms: ["simulation", "hil"],
  },
  {
    id: "hil",
    name: "硬件在环测试 (HIL)",
    aliases: ["Hardware-in-the-Loop", "HIL测试", "硬件在环"],
    category: "评测",
    difficulty: 2,
    summary: "将真实ECU/传感器硬件接入仿真环境的闭环测试，可验证硬件时序、资源竞争等软件仿真无法覆盖的问题。",
    description: "HIL测试在仿真环境中加入真实的硬件设备（如域控制器、ECU），与仿真环境形成闭环。HIL可以验证SIL无法覆盖的硬件相关问题：时序约束、CPU/GPU资源竞争、通信延迟、内存泄漏等。HIL测试成本高于SIL，但远低于实车测试，是量产验证的关键环节。",
    relatedTerms: ["sil", "simulation"],
  },
  {
    id: "sim2real",
    name: "仿真到真实差距 (Sim2Real Gap)",
    aliases: ["Sim-to-Real Gap", "虚实差异", "仿真偏差"],
    category: "评测",
    difficulty: 3,
    summary: "仿真环境与真实世界之间的差异，是仿真测试面临的核心挑战，包括传感器模型偏差、场景不完整等。",
    description: "Sim2Real Gap是仿真测试的根本挑战，指在仿真中表现良好的算法在真实世界中可能失效。来源包括：\n• 传感器模型偏差：仿真摄像头/激光雷达与真实传感器输出有差异\n• 场景不完整：仿真无法覆盖所有真实场景的变化\n• 行为模型简化：其他交通参与者的行为模型过于简单\n• 物理引擎精度：车辆动力学、轮胎模型等简化\n\n缩小Sim2Real Gap的方法：域随机化(Domain Randomization)、真实数据增强、混合仿真等。",
    relatedTerms: ["simulation"],
    controversy: "Sim2Real Gap是否能被完全消除，还是仿真永远只是补充手段"
  },
  {
    id: "ros",
    name: "机器人操作系统 (ROS)",
    aliases: ["Robot Operating System", "ROS2"],
    category: "开发",
    difficulty: 1,
    summary: "机器人软件开发的核心框架，提供分布式架构、丰富工具生态和社区支持，在自动驾驶开发中广泛采用。",
    description: "ROS是机器人软件开发的核心框架，在自动驾驶开发中被广泛采用。核心概念：\n• Node（节点）：执行特定计算的进程\n• Topic（话题）：节点间发布/订阅消息的通道\n• Service（服务）：节点间请求/响应的通信\n• Action（动作）：长时间运行的任务\n\n主要优势：丰富的工具生态(RViz/Gazebo)、分布式架构、庞大社区。\nROS1→ROS2的演进：支持实时性、多机器人、DDS通信中间件。",
    relatedTerms: ["simulation", "mcap"],
  },
  {
    id: "mcap",
    name: "MCAP数据格式",
    aliases: ["Message Container Archive Packet", "路测数据格式"],
    category: "开发",
    difficulty: 2,
    summary: "路测数据通常采用的存储格式，是开放容器格式，支持多通道时序数据（图像/点云/雷达等）的存储和回放。",
    description: "MCAP是自动驾驶路测数据的标准存储格式，是一种开放的容器格式，能够在单个文件中存储多个通道的时序数据。支持图像、点云、CAN总线、GPS等多种消息类型。MCAP的优势：高效索引、支持按时间范围快速检索、跨平台兼容。",
    relatedTerms: ["ros", "data-closed-loop"],
  },
  {
    id: "foxglove",
    name: "Foxglove可视化平台",
    aliases: ["Foxglove Studio", "数据可视化"],
    category: "开发",
    difficulty: 2,
    summary: "现代化的机器人数据可视化平台，支持数据回放、可视化分析、调试工具，是自动驾驶数据分析利器。",
    description: "Foxglove是现代化的机器人数据可视化平台，提供直观的Web界面和丰富的插件生态。支持MCAP/ROS bag数据回放、传感器数据可视化、自定义面板布局等功能。是自动驾驶数据分析和调试的重要工具。",
    relatedTerms: ["ros", "mcap"],
  },

  // ========== 评测体系补充 ==========
  {
    id: "mcp",
    name: "接管里程覆盖率 (MCP)",
    aliases: ["Miles Per Intervention Coverage", "MCP指标"],
    category: "评测",
    difficulty: 2,
    summary: "接管事件发生的路段占总里程的比例，可细致反映系统在不同路段的表现和薄弱环节。",
    description: "MCP指标衡量接管事件的空间分布情况，即接管事件发生在哪些路段，这些路段占总里程的比例是多少。MCP可以更细致地反映系统在不同路段的表现差异，识别系统能力的薄弱环节。例如，某系统整体MPI很高，但如果MCP显示接管集中在隧道或环岛路段，则说明这些场景需要重点优化。",
    relatedTerms: ["mpi", "override"],
  },
  {
    id: "god",
    name: "通用障碍物检测 (GOD)",
    aliases: ["General Obstacle Detection", "通用障碍物识别", "占用网络"],
    category: "感知",
    difficulty: 2,
    summary: "不预设障碍物类别，直接判断该区域是否可通行的感知方法，是应对未知障碍物的核心能力。",
    description: "GOD不依赖预定义的障碍物类别（车/人/自行车等），而是直接判断某个区域是否可通行。传统感知方法需要先识别障碍物类别再判断危险性，对于训练集中没有的物体（如散落货物、异形障碍物）可能漏检；GOD则直接判断'这个位置能不能走'，无需知道障碍物是什么。\n\nGOD通常通过占用网络(Occupancy Network)实现，将周围空间划分为体素网格，预测每个体素的占用状态。GOD是当前感知系统的重要发展方向。",
    relatedTerms: ["occupancy-network", "bev"],
    evolution: "规则避障→目标检测→语义分割→占用网络(GOD)"
  },
  {
    id: "occupancy-network",
    name: "占用网络 (Occupancy Network)",
    aliases: ["Occupancy Network", "占用网格", "体素占用"],
    category: "感知",
    difficulty: 2,
    summary: "将周围3D空间划分为体素网格，预测每个体素的占用状态和语义，是GOD通用障碍物检测的主流实现方式。",
    description: "占用网络将车辆周围的3D空间划分为细密的体素(Voxel)网格，通过神经网络预测每个体素是否被占用以及对应的语义类别。相比传统目标检测，占用网络的优势：\n• 不受预定义类别限制，可检测任意形状障碍物\n• 提供稠密的3D空间理解\n• 更适合不规则障碍物（如散落货物、施工区域）\n\n占用网络是特斯拉在AI Day上重点展示的技术，也是当前行业的热门研究方向。",
    relatedTerms: ["god", "bev"],
  },
  {
    id: "override",
    name: "驾驶员接管 (Override)",
    aliases: ["Override", "接管", "人工接管"],
    category: "人机",
    difficulty: 1,
    summary: "驾驶员主动干预智驾系统的行为，是衡量系统可靠性的核心指标，分纵向接管和横向接管。",
    description: "Override是驾驶员主动干预自动驾驶系统控制的行为。分为：\n\n• 纵向Override：驾驶员踩油门/刹车（对速度不满意）\n• 横向Override：驾驶员转动方向盘超过阈值（对方向不满意）\n\n关键指标：\n• 接管率：Override发生次数/总里程\n• 接管时长：驾驶员接管了多久\n• 接管意图：接管原因（不舒适/不信任/想自己开）\n\n数据采集：Override时记录场景、原因、接管前后系统状态，用于分析系统不足、优化算法、减少误触发。",
    relatedTerms: ["mpi", "mcp", "disengagement"],
  },
  {
    id: "sr",
    name: "态势感知 (SR)",
    aliases: ["Situation Recognition", "SR显示", "环境感知显示"],
    category: "人机",
    difficulty: 1,
    summary: "将传感器处理后的信息渲染显示，让用户看到'系统看到了什么'，是增强用户信任的核心HMI功能。",
    description: "SR是智驾系统与用户之间的'可视化翻译'，将摄像头、激光雷达等传感器处理后信息渲染到中控屏/HUD上。SR显示的内容包括：周围车辆位置/速度/意图、道路结构、交通信号、天气状况等。\n\nSR的核心作用：\n• 让用户看到'系统看到了什么'，增强信任\n• 是用户判断是否需要接管的重要依据\n• 好的SR显示能显著提升安心感\n\nSR的质量直接影响用户对智驾系统的信任度和使用意愿。",
    relatedTerms: ["hmi", "override"],
    commonMisconception: "SR不只是'好看的动画'，它是影响用户信任和接管决策的关键安全功能"
  },
  {
    id: "vru",
    name: "弱势道路使用者 (VRU)",
    aliases: ["Vulnerable Road User", "弱势群体", "行人保护"],
    category: "法规",
    difficulty: 1,
    summary: "包括行人、自行车骑行者等无保护、行为随机、目标小的道路使用者，是智驾安全保护的重点对象。",
    description: "VRU指在道路使用者中处于弱势地位的群体，包括行人、自行车骑行者、电动两轮车骑行者等。VRU的特点：\n• 无保护：没有车身结构保护\n• 行为随机：运动方向和速度难以预测\n• 目标小：远距离检测困难\n\nVRU检测和避让是AEB-VRU法规要求的核心功能，也是智驾安全性的关键指标。C-NCAP 2024和E-NCAP 2026都加强了对VRU保护的要求。",
    relatedTerms: ["aeb", "ncap"],
  },
  {
    id: "ota",
    name: "远程升级 (OTA)",
    aliases: ["Over-The-Air", "空中升级", "在线升级"],
    category: "开发",
    difficulty: 1,
    summary: "通过无线网络远程推送软件更新，无需4S店，是智能汽车持续优化和修复问题的重要能力。",
    description: "OTA技术使软件更新不再依赖线下渠道，能够快速、大规模地推送更新。分为：\n• SOTA（软件OTA）：更新应用层软件，如导航、娱乐系统\n• FOTA（固件OTA）：更新底层固件，如ECU程序、智驾算法\n\nFOTA是智驾系统持续迭代的关键能力，通过FOTA可以不断升级感知算法、决策策略等功能，使车辆具备越来越强的自动驾驶能力。\n\nOTA的风险：升级失败可能导致车辆功能异常，需要完善的回滚机制和灰度发布策略。",
    relatedTerms: ["data-closed-loop", "shadow-mode"],
  },
  {
    id: "lane-change",
    name: "变道决策",
    aliases: ["Lane Change", "自动变道", "ALC"],
    category: "决策",
    difficulty: 2,
    summary: "智驾系统自动判断并执行车道变更的决策过程，包含变道时机选择、目标车道安全确认、变道执行三个阶段。",
    description: "变道是智驾中最复杂的操作之一，需要准确判断自车与周围车辆的关系并做出合适的时序决策。变道过程包含：\n1. 变道时机选择：根据导航意图和当前车道效率判断是否需要变道\n2. 目标车道安全确认：检查目标车道前后车辆距离和速度\n3. 变道执行：横向控制转向+纵向调速配合\n\n常见问题：过早或过晚发起变道、变道过程中未能识别相邻车道车辆、变道执行不平顺、变道犹豫等。",
    relatedTerms: ["behavior-planning", "pnc", "lateral-control"],
  },
  {
    id: "white-list",
    name: "白名单机制",
    aliases: ["White List", "可信目标列表", "白名单"],
    category: "感知",
    difficulty: 2,
    summary: "经过验证的可信目标列表，用于障碍物识别，提高识别效率和准确性，减少误识别。",
    description: "白名单机制是在感知系统中维护一个经过验证的可信目标列表。当检测到的目标在白名单中时，可以快速确认其类别和属性，提高识别效率和准确性。白名单常用于交通标志识别、车道线类型判断等场景。",
    relatedTerms: ["god"],
  },
  {
    id: "trigger-mechanism",
    name: "触发机制",
    aliases: ["Trigger", "策略触发", "功能激活条件"],
    category: "架构",
    difficulty: 2,
    summary: "智驾功能策略介入的条件判断逻辑，定义了系统在不同场景下的响应方式，包括功能激活/退出/接管提醒条件。",
    description: "触发机制定义了自动驾驶系统在不同场景下应该如何响应，包括：\n• 功能激活条件：何时启用NOA/泊车等功能\n• 功能退出条件：何时退出自动模式\n• 接管提醒策略：何时提醒驾驶员接管\n\n触发机制的合理性直接影响用户体验和安全性。过于保守的触发条件导致功能可用性低，过于激进的触发条件可能导致安全隐患。",
    relatedTerms: ["override", "odd"],
  },

  // ====== 决策规划 ======

  {
    id: "behavior-planning",
    name: "行为规划",
    aliases: ["Behavior Planning", "行为决策", "Behavioral Decision"],
    category: "决策",
    difficulty: 2,
    summary: "决定车辆应采取的宏观行为（跟车/换道/超车/让行/停车等），是决策链条的关键环节。",
    description: "行为规划接收感知和预测模块的环境信息，结合道路规则和交通状况，做出高层次驾驶决策。需要综合考虑安全性、效率性、舒适性和合法性。常用实现方法：有限状态机(FSM)、决策树、基于学习的方法。\n\n行为规划是自动驾驶决策的核心难点——在复杂城区场景中，车辆需要在数秒内判断是跟车、变道还是让行，决策的合理性直接影响安全和体验。",
    relatedTerms: ["trajectory-planning", "motion-control", "pnc"],
    controversy: "规则驱动 vs 学习驱动：传统行为规划依赖手写规则（FSM/决策树），可解释但泛化差；端到端方案直接从数据学习行为策略，泛化强但不可解释。行业趋势是规则兜底+学习优化的混合架构。",
  },
  {
    id: "trajectory-planning",
    name: "轨迹规划",
    aliases: ["Trajectory Planning", "路径规划", "Path Planning"],
    category: "决策",
    difficulty: 2,
    summary: "生成满足行为决策的详细行驶轨迹（位置、速度、加速度随时间变化），连接行为意图与运动控制。",
    description: "轨迹规划是行为规划和运动控制的桥梁，需要满足：\n• 安全性约束：不碰撞、不越道路边界\n• 运动学约束：车辆物理特性限制\n• 动力学约束：加速度、曲率限制\n\n常用算法：\n• 基于采样：RRT、RRT*\n• 基于搜索：A*、Hybrid A*\n• 基于优化：模型预测控制(MPC)\n\n轨迹质量直接决定乘坐舒适度——规划出的曲线越平滑，体感越好。",
    relatedTerms: ["behavior-planning", "motion-control", "mpc", "pnc"],
  },
  {
    id: "motion-control",
    name: "运动控制",
    aliases: ["Motion Control", "车辆控制", "Vehicle Control"],
    category: "控制",
    difficulty: 2,
    summary: "将规划轨迹转化为具体控制指令（方向盘转角/油门开度/刹车力度），直接与执行器交互。",
    description: "运动控制是自动驾驶系统的最底层，直接与车辆执行器交互。分为：\n• 横向控制：控制方向盘，保持车道、变道\n• 纵向控制：控制油门刹车，保持车距、加减速\n• 横纵耦合：复杂场景横向纵向协同控制\n\n常用控制方法：PID控制、模型预测控制(MPC)、自适应控制。高性能控制系统需准确理解车辆动力学特性，适应不同路况和驾驶风格。",
    relatedTerms: ["trajectory-planning", "mpc", "pid", "pnc"],
  },
  {
    id: "pnc",
    name: "规划与控制",
    aliases: ["PNC", "Planning and Control", "规控"],
    category: "决策",
    difficulty: 1,
    summary: "规划与控制的统称，规划生成路径，控制执行路径，是自动驾驶决策执行的核心模块。",
    description: "PNC是自动驾驶中规划(Planning)与控制(Control)的合称：\n\n规划部分：\n• 任务规划：全局路线规划（导航）\n• 行为规划：决定做什么动作（跟车/变道/超车）\n• 轨迹规划：生成具体行驶轨迹\n\n控制部分：\n• 横向控制：控制方向盘，保持车道\n• 纵向控制：控制油门刹车，保持车距\n• 横纵耦合：复杂场景协同控制\n\nPNC是智驾体验的直接决定因素——变道是否果断、跟车是否平顺、过弯是否丝滑，都取决于PNC质量。",
    relatedTerms: ["behavior-planning", "trajectory-planning", "motion-control", "mpc"],
  },
  {
    id: "mpc",
    name: "模型预测控制",
    aliases: ["MPC", "Model Predictive Control"],
    category: "控制",
    difficulty: 3,
    summary: "通过滚动优化求解最优控制序列的高级控制方法，能显式处理约束，是自动驾驶控制的主流方法之一。",
    description: "MPC在每个控制周期：\n1. 基于当前状态和系统模型，预测未来一段时间的状态轨迹\n2. 在满足约束条件下，求解使代价函数最小的控制序列\n3. 只执行控制序列的第一步，下一周期重新优化\n\n优势：\n• 可显式处理安全约束（碰撞 avoidance、加速度限制）\n• 可处理多目标优化（安全+舒适+效率）\n• 天然适合横纵耦合控制\n\n劣势：\n• 计算量大，需要高效数值求解器\n• 模型精度影响控制质量\n\n趋势：端到端方案在简单场景替代MPC，但MPC仍是安全兜底的关键组件。",
    relatedTerms: ["motion-control", "pnc", "trajectory-planning"],
    evolution: "从线性MPC到非线性MPC(NMPC)，再到基于学习的MPC（将神经网络融入预测模型），提升对复杂动力学建模的能力。",
  },
  {
    id: "pid",
    name: "PID控制",
    aliases: ["PID", "Proportional-Integral-Derivative", "比例-积分-微分控制"],
    category: "控制",
    difficulty: 1,
    summary: "最经典的基础控制算法，通过比例、积分、微分三个环节的线性组合实现闭环控制，简单可靠。",
    description: "PID控制是最基础最成熟的控制方法：\n• P(比例)：根据当前误差输出控制量，误差越大控制越强\n• I(积分)：累积历史误差，消除稳态偏差\n• D(微分)：根据误差变化率预判趋势，减少超调\n\n在自动驾驶中，PID常用于：\n• 纵向跟车控制（速度/距离跟踪）\n• 简单横向控制（车道保持）\n\n优点：简单、稳定、无需精确模型\n缺点：参数调优依赖经验、难以处理复杂约束和多变量耦合\n\n在高级智驾中，PID通常作为底层执行器级控制，上层由MPC或优化方法生成目标值。",
    relatedTerms: ["mpc", "motion-control"],
  },
  {
    id: "rrt",
    name: "快速随机探索树",
    aliases: ["RRT", "Rapidly-exploring Random Tree", "RRT*"],
    category: "决策",
    difficulty: 3,
    summary: "基于采样的轨迹规划算法，通过随机采样快速探索空间，RRT*可保证渐进最优性。",
    description: "RRT是轨迹规划中常用的采样算法：\n• 从起点开始，随机采样空间中的点\n• 向采样点方向扩展树节点\n• 不断扩展直到到达目标区域\n\nRRT*改进：\n• 重新连接：发现更短路径时更新父节点\n• 渐进最优：随着采样次数增加，路径质量趋近最优\n\n适用场景：\n• 避障路径规划（泊车、狭窄空间）\n• 非结构化环境（停车场、园区）\n\n局限：\n• 路径可能不够平滑，需要后处理\n• 计算时间不确定，不适合实时性要求极高的场景",
    relatedTerms: ["trajectory-planning", "hybrid-astar", "pnc"],
  },
  {
    id: "hybrid-astar",
    name: "混合A*算法",
    aliases: ["Hybrid A*", "Hybrid A-star"],
    category: "决策",
    difficulty: 3,
    summary: "考虑车辆运动学约束的A*搜索算法，广泛用于泊车等低速场景的轨迹规划。",
    description: "标准A*算法搜索的路径不考虑车辆运动学约束（最小转弯半径等），生成的路径车辆无法实际执行。Hybrid A*将车辆运动学模型融入搜索过程：\n\n• 节点扩展时考虑前轮转角限制\n• 搜索空间从2D网格变为连续状态空间(x,y,θ)\n• 生成的路径天然满足车辆运动学约束\n\n典型应用：\n• 自动泊车轨迹规划\n• 窄路掉头\n• 交叉路口通行\n\n改进方向：\n• 结合Reeds-Shepp曲线提升路径光滑度\n• 使用RS曲线作为启发函数加速搜索",
    relatedTerms: ["trajectory-planning", "rrt", "pnc"],
  },
  {
    id: "lattice-planner",
    name: "Lattice规划器",
    aliases: ["Lattice Planner", "网格规划", "采样子集规划"],
    category: "决策",
    difficulty: 3,
    summary: "通过在终点状态空间采样生成候选轨迹集合，选择最优轨迹的规划方法，适合结构化道路。",
    description: "Lattice规划器的工作流程：\n1. 在终点状态空间(s,l)或(x,y,θ,v)中采样多个目标点\n2. 对每个目标点用多项式或样条曲线生成连接当前状态的候选轨迹\n3. 对所有候选轨迹进行代价评估（安全+舒适+效率）\n4. 选择代价最小的轨迹输出\n\n优势：\n• 可控的候选轨迹数量，计算时间稳定\n• 适合结构化道路（车道级规划）\n• 每条候选轨迹都可做碰撞检测\n\n应用：百度Apollo的Lattice Planner是其高速场景的核心规划器。",
    relatedTerms: ["trajectory-planning", "pnc"],
    relatedBrands: ["baidu"],
  },
  {
    id: "prediction",
    name: "行为预测",
    aliases: ["Prediction", "Trajectory Prediction", "轨迹预测"],
    category: "决策",
    difficulty: 2,
    summary: "预测周围交通参与者（行人/车辆/自行车等）未来的运动轨迹和行为意图，为决策规划提供前瞻信息。",
    description: "行为预测是自动驾驶最具挑战性的模块之一：\n• 需要预测多个目标的未来行为\n• 行人行为高度随机、不可预测\n• 需要处理交互关系（前车刹车、旁车变道）\n\n主流方法演进：\n1. 基于规则：简单的恒速/恒加速度假设\n2. 基于学习：RNN/LSTM预测轨迹\n3. 交互感知：图神经网络(GNN)建模交互\n4. 多模态预测：输出多条可能轨迹+概率分布\n\n关键挑战：预测不确定性——需要输出概率分布而非确定性轨迹，决策模块需要考虑最坏情况。",
    relatedTerms: ["behavior-planning", "bev", "gnn"],
  },

  // ====== 定位系统 ======

  {
    id: "gnss",
    name: "全球导航卫星系统",
    aliases: ["GNSS", "GPS", "北斗", "RTK", "卫星定位"],
    category: "定位",
    difficulty: 1,
    summary: "通过接收多颗卫星信号计算位置，RTK差分技术可将精度提升至厘米级，是自动驾驶定位的基础。",
    description: "全球导航卫星系统包括：\n• GPS（美国）\n• 北斗（中国）\n• 伽利略（欧洲）\n• 格洛纳斯（俄罗斯）\n\nRTK差分定位：\n• 基准站接收卫星信号，计算定位误差\n• 实时发送误差修正给移动站\n• 实现厘米级高精度定位\n\n局限：\n• 城市峡谷/隧道/地下车库信号遮挡\n• 需要与惯性导航组合使用\n• 依赖基站网络覆盖",
    relatedTerms: ["ins", "hd-map", "slam"],
  },
  {
    id: "ins",
    name: "惯性导航系统",
    aliases: ["INS", "IMU", "Inertial Navigation System", "惯性测量单元"],
    category: "定位",
    difficulty: 2,
    summary: "通过加速度计和陀螺仪积分推算位置和姿态，更新频率高、不受外部信号影响，是GNSS的重要补充。",
    description: "惯性导航系统核心组件：\n• 加速度计：测量三轴加速度\n• 陀螺仪：测量三轴角速度\n\n工作原理：通过对加速度二次积分得到位置，对角速度积分得到姿态。\n\n优势：\n• 更新频率高（100-400Hz），远超GNSS\n• 不依赖外部信号，隧道/地下可用\n• 短期精度高\n\n劣势：\n• 误差随时间累积（漂移）\n• 高精度INS成本高（工业级数万元）\n\n组合导航：GNSS-RTK + INS + 高精地图匹配，是自动驾驶定位的标准方案。GNSS提供绝对位置，INS提供高频增量，地图匹配提供校正。",
    relatedTerms: ["gnss", "hd-map"],
  },
  {
    id: "hd-map",
    name: "高精地图",
    aliases: ["HD Map", "High Definition Map", "高精度地图"],
    category: "定位",
    difficulty: 2,
    summary: "厘米级精度的道路信息地图，包含车道级几何和语义信息，用于定位、规划和感知的超视距补充。",
    description: "高精地图与传统导航地图的根本区别：\n• 精度：厘米级 vs 米级\n• 内容：车道级几何+语义 vs 道路级\n• 更新：实时/准实时 vs 离线\n\n四层信息结构：\n1. 道路层：道路几何、属性（限速/类型）\n2. 定位层：标志物（电线杆/交通标志/路面标记）\n3. 语义层：车道连接关系、交通规则、信号灯相位\n4. 动态层：实时交通信息、动态事件\n\n核心作用：\n• 定位：厘米级匹配定位\n• 规划：提前知道路况，提前决策\n• 感知：超视距信息补充，弥补传感器探测局限\n• 安全：传感器失效时的备选\n\n行业争议：\n• \"重地图\"派：高精地图是安全基石\n• \"轻地图/无图\"派：高精地图鲜度不够、成本高，端到端+实时感知足够\n• 趋势：从重地图向轻地图演进，但完全无图仍需时间",
    relatedTerms: ["gnss", "ins", "slam", "e2e"],
    controversy: "重地图 vs 无图：华为/小鹏/理想等纷纷转向\"无图\"方案，但完全无图目前仍无法覆盖所有场景。折中方案是用轻量级地图(LD地图)提供道路拓扑和关键语义。",
  },
  {
    id: "slam",
    name: "同步定位与地图构建",
    aliases: ["SLAM", "Simultaneous Localization and Mapping"],
    category: "定位",
    difficulty: 3,
    summary: "在未知环境中同时完成自身定位和环境地图构建的技术，是自动驾驶建图和定位的核心方法。",
    description: "SLAM解决的是\"鸡和蛋\"问题：\n• 需要地图来定位\n• 需要定位来建图\n\n自动驾驶中的SLAM：\n• 视觉SLAM：基于摄像头特征点匹配\n• 激光SLAM：基于点云配准(ICP)\n• 多传感器融合SLAM：视觉+激光+IMU\n\n主要应用：\n• 地图采集车建图\n• 无图方案中的在线定位\n• 地下停车场定位\n\n关键指标：\n• 建图精度\n• 实时性\n• 鲁棒性（动态物体/特征退化场景）",
    relatedTerms: ["gnss", "ins", "hd-map", "lidar"],
  },

  // ====== 车联网 ======

  {
    id: "v2x",
    name: "车联网通信",
    aliases: ["V2X", "Vehicle to Everything", "车路协同", "C-V2X"],
    category: "通信",
    difficulty: 1,
    summary: "车辆与周围环境进行信息交换的技术体系，突破单车感知局限，实现超视距信息获取。",
    description: "V2X四大通信模式：\n• V2V（车与车）：交换位置/速度/方向，碰撞预警、协同换道\n• V2I（车与基础设施）：路侧单元交换信号/路况，信号灯预警、绿波通行\n• V2P（车与行人）：行人保护预警\n• V2N（车与网络）：云端通信，实时路况、远程诊断\n\n两种技术路线：\n• DSRC：基于WiFi的专用短程通信，美国主导\n• C-V2X：基于蜂窝网络，中国主导，3GPP标准化\n\n中国现状：\n• 政策强力推动C-V2X\n• 部分城市建成车路协同示范区\n• 但大规模商业化仍需基础设施铺设",
    relatedTerms: ["odd", "lidar", "5g"],
  },

  // ====== 开发体系 ======

  {
    id: "data-loop",
    name: "数据闭环",
    aliases: ["Data Loop", "数据飞轮", "Data Flywheel"],
    category: "开发",
    difficulty: 2,
    summary: "自动驾驶算法迭代的核心方法论，通过持续的数据采集→分析→优化→验证循环提升系统性能。",
    description: "完整数据闭环流程：\n1. 外场实车采集路测数据（含通勤路线）\n2. 上传云端，数据清洗、标注分析\n3. 算法迭代优化\n4. 内场回灌、仿真工具回归测试\n5. 多源场景构建标准化评测数据集\n6. 内场验证合格后外场实车复测\n7. OTA远程升级下发至车辆\n8. 持续循环迭代\n\n数据闭环是量产智驾的核心竞争力：\n• 谁拥有更多数据，谁迭代更快\n• 谁迭代更快，谁体验更好\n• 谁体验越好，谁用户越多\n• 谁用户越多，谁数据越多（飞轮效应）\n\n关键挑战：数据标注成本、长尾场景覆盖、仿真-实车Gap。",
    relatedTerms: ["shadow-mode", "simulation", "ota", "mpi"],
  },
  {
    id: "commute-route",
    name: "通勤路线",
    aliases: ["Commuting Route", "通勤场景", "高频路线"],
    category: "开发",
    difficulty: 1,
    summary: "用户日常上下班的固定重复路线，路况稳定场景重复度高，是外场数据采集主力场景和内场评测数据集核心。",
    description: "通勤路线定义：固定高频、日常上下班的固定重复路线。\n\n特点：\n• 路线固定、场景熟悉，包含跟车/路口/拥堵/变道等高频场景\n• 数据重复度高、样本量大，极易形成数据闭环富集\n• 直接影响用户日常体验：安全/效率/安心感/舒适感\n\n在开发中的作用：\n• 外场：通勤路线是量产车数据采集主力场景，源源不断产生路测数据、接管数据\n• 内场：优先基于通勤路线典型场景构建评测数据集，回灌仿真重点验证日常场景\n• 迭代优先级：通勤高频场景优先优化，优先提升日常MPI、降低日常接管",
    relatedTerms: ["data-loop", "mpi", "simulation"],
  },
  {
    id: "simulation",
    name: "仿真测试",
    aliases: ["Simulation", "Sim", "虚拟测试", "CARLA"],
    category: "开发",
    difficulty: 2,
    summary: "在虚拟环境中模拟各种驾驶场景进行算法验证，是自动驾驶开发的核心测试手段，与实车测试互补。",
    description: "仿真测试分类：\n• 软件在环(SIL)：纯软件仿真，算法在虚拟环境中运行\n• 硬件在环(HIL)：加入真实硬件设备进行闭环测试\n• 车辆在环(VIL)：整车在台架上+虚拟场景\n\n主流仿真平台：\n• CARLA：开源，学术界主流\n• PreScan：商业，西门子出品\n• VTD：商业，德国VIRES\n• 腾讯TAD Sim：中国自主研发\n\nSim2Real Gap（仿真到现实的鸿沟）：\n• 传感器仿真精度不足\n• 交通流行为不够真实\n• 极端天气模拟有限\n\n解决思路：\n• 真实数据回灌提升仿真真实性\n• 混合仿真（真实感知+虚拟场景）\n• NeRF/3DGS生成逼真场景",
    relatedTerms: ["sil", "hil", "data-loop", "shadow-mode"],
  },
  {
    id: "sil",
    name: "软件在环测试",
    aliases: ["SIL", "Software-in-the-Loop", "MIL"],
    category: "开发",
    difficulty: 2,
    summary: "纯软件层面的算法验证，在虚拟环境中运行算法，测试场景可重复、成本较低。",
    description: "SIL测试特点：\n• 算法代码在PC上运行，不涉及真实硬件\n• 输入为仿真数据或回灌数据\n• 可大规模并行测试\n\n验证链：\nMIL(模型在环) → SIL(软件在环) → HIL(硬件在环) → VIL(车辆在环) → 实车\n\n优势：\n• 测试场景完全可控\n• 可反复复现问题\n• 成本低、速度快\n\n局限：\n• 无法验证硬件实时性\n• 传感器模型简化，不能完全替代实车",
    relatedTerms: ["hil", "simulation", "data-loop"],
  },
  {
    id: "hil",
    name: "硬件在环测试",
    aliases: ["HIL", "Hardware-in-the-Loop"],
    category: "开发",
    difficulty: 2,
    summary: "在仿真环境中加入真实硬件设备进行闭环测试，验证软硬件集成效果，是量产前的关键验证环节。",
    description: "HIL测试在仿真环境中接入真实ECU/域控制器：\n• 被测硬件运行真实软件\n• 仿真器提供虚拟传感器信号\n• 硬件输出的控制指令反馈给仿真器\n\n核心价值：\n• 验证硬件实时性能\n• 验证软硬件接口正确性\n• 发现纯软件仿真无法覆盖的时序问题\n\n典型配置：\n• 实时仿真机（dSPACE/NI）\n• 真实域控制器\n• 信号调理接口\n• 故障注入模块",
    relatedTerms: ["sil", "simulation"],
  },
  {
    id: "ros",
    name: "机器人操作系统",
    aliases: ["ROS", "Robot Operating System", "ROS2"],
    category: "开发",
    difficulty: 1,
    summary: "机器人软件开发的核心框架，在自动驾驶开发中广泛采用，提供分布式架构和丰富工具生态。",
    description: "ROS核心概念：\n• 节点(Node)：独立运行的进程\n• 话题(Topic)：节点间发布/订阅消息\n• 服务(Service)：请求/响应式通信\n• 动作(Action)：长时间运行的任务\n\n主要优势：\n• 丰富的工具生态：RViz可视化、Gazebo仿真\n• 分布式架构：支持多机协同\n• 庞大的社区支持：丰富的开源包\n\nROS2改进：\n• 支持DDS通信，更可靠\n• 实时性增强\n• 安全性提升\n\n局限：\n• ROS1不是实时系统\n• 单点故障（ROS Master）\n• 不适合量产产品（多用于研发阶段）",
    relatedTerms: ["simulation", "data-loop"],
  },
  {
    id: "mcap",
    name: "MCAP数据格式",
    aliases: ["MCAP", "Message Container Archive Packet"],
    category: "开发",
    difficulty: 1,
    summary: "路测数据的标准存储格式，开放容器格式，支持多通道时序数据（图像/点云/雷达等）。",
    description: "MCAP格式特点：\n• 开放标准，由Foxglove主导\n• 单文件存储多通道时序数据\n• 支持索引，可快速定位特定时间段\n• 支持压缩，节省存储空间\n\n替代ROS bag格式：\n• ROS bag依赖ROS环境\n• MCAP独立于ROS，更通用\n• Foxglove工具原生支持MCAP\n\n典型使用场景：\n• 路测数据回放分析\n• 算法回灌测试\n• 数据标注",
    relatedTerms: ["ros", "data-loop"],
  },
  {
    id: "foxglove",
    name: "Foxglove可视化平台",
    aliases: ["Foxglove", "Foxglove Studio"],
    category: "开发",
    difficulty: 1,
    summary: "现代化的机器人数据可视化平台，支持数据回放、可视化分析、调试工具，是自动驾驶数据分析的利器。",
    description: "Foxglove提供：\n• Web界面，跨平台使用\n• 丰富的可视化面板：3D/图表/图像/地图\n• 支持ROS bag和MCAP格式回放\n• 插件生态扩展\n\n核心功能：\n• 传感器数据回放（摄像头/激光雷达/IMU）\n• 规划轨迹可视化\n• 感知结果标注显示\n• 自定义布局和面板\n\n对比rviz：\n• Foxglove更现代化、Web化\n• rviz更深度集成ROS生态\n• 两者互为补充",
    relatedTerms: ["ros", "mcap", "rviz"],
  },
  {
    id: "rviz",
    name: "RViz可视化工具",
    aliases: ["RViz", "rviz", "ROS可视化"],
    category: "开发",
    difficulty: 1,
    summary: "ROS官方三维可视化工具，实时显示传感器数据、规划轨迹、车辆模型等，是自动驾驶开发常用调试工具。",
    description: "RViz核心功能：\n• 3D点云可视化\n• 摄像头图像显示\n• 轨迹/路径可视化\n• TF坐标变换显示\n• 标记(Marker)自定义可视化\n\n使用场景：\n• 调试感知算法输出\n• 验证规划轨迹合理性\n• 定位结果可视化\n\n局限：\n• 仅支持ROS环境\n• 界面较老旧\n• 大数据量下性能有限",
    relatedTerms: ["ros", "foxglove"],
  },
  {
    id: "eval-dataset",
    name: "评测数据集",
    aliases: ["Benchmark", "Evaluation Dataset", "评测集", "标准化数据集"],
    category: "开发",
    difficulty: 2,
    summary: "衡量自动驾驶系统性能的标准化数据集，对客观评价系统能力至关重要。",
    description: "评测数据集构建流程：\n1. 多源数据筛选清洗\n2. 标注分类\n3. 标准化固化\n4. 绑定量化指标\n5. 持续扩充\n\n关键原则：\n• 代表性：覆盖各类典型场景\n• 多样性：不同天气/时段/路况\n• 标注质量：人工复核+交叉验证\n• 可重复性：固定数据集+固定指标\n\n行业评测集：\n• nuScenes：学术界主流\n• Waymo Open Dataset：业界标杆\n• Argoverse：预测任务专用\n\n量产评测集：各厂商自建，通常不公开，包含通勤路线典型场景。",
    relatedTerms: ["mpi", "simulation", "data-loop"],
  },

  // ====== 人机交互 ======

  {
    id: "sr",
    name: "态势感知",
    aliases: ["SR", "Situation Recognition", "态势感知显示", "SR界面"],
    category: "人机",
    difficulty: 1,
    summary: "将传感器处理后的信息渲染展示的界面，让用户看到\"系统看到了什么\"，增强用户信任感。",
    description: "SR界面是智驾系统与驾驶员的\"翻译官\"：\n\n显示内容：\n• 周围车辆位置、速度、意图\n• 道路结构（车道线/路口）\n• 交通信号灯状态\n• 行人/自行车位置\n\n核心价值：\n• 让驾驶员理解系统当前认知\n• 增强对系统的信任感\n• 是接管决策的重要依据——如果SR显示准确，用户更安心\n\n设计原则：\n• 不能过多分散驾驶员注意力\n• 关键信息优先级突出\n• 延迟<100ms，否则失去参考价值\n\n行业对比：\n• 特斯拉：纯视觉SR，渲染精美\n• 华为：SR细节丰富，显示激光雷达点云\n• 小鹏：SR信息密度高，显示变道意图",
    relatedTerms: ["hmi", "override", "odd"],
    relatedBrands: ["huawei", "tesla", "xpeng"],
  },
  {
    id: "hmi",
    name: "人机交互界面",
    aliases: ["HMI", "Human-Machine Interface", "人机交互"],
    category: "人机",
    difficulty: 1,
    summary: "智驾系统与驾驶员之间的信息交换桥梁，包括仪表盘、中控屏、HUD、声音和震动提醒等。",
    description: "HMI是智驾系统的\"翻译官\"：\n\n信息展示：\n• 仪表盘：系统可用性/驾驶模式/感知目标\n• 中控屏：详细设置和功能入口\n• HUD：关键信息投射到挡风玻璃\n\n接管提醒（L2/L3关键安全功能）：\n• 视觉：图标闪烁/弹窗\n• 听觉：警报音/语音播报\n• 触觉：座椅震动/方向盘振动\n\n设计挑战：\n• 平衡信息量和注意力干扰\n• 多模态提醒的优先级设计\n• 避免过度提醒引起恐慌\n\n行业趋势：AR-HUD逐渐成为高端智驾标配。",
    relatedTerms: ["sr", "override", "ota"],
  },
  {
    id: "override",
    name: "驾驶员接管",
    aliases: ["Override", "Takeover", "接管", "人工接管"],
    category: "人机",
    difficulty: 1,
    summary: "驾驶员主动介入驾驶控制的行为，分为纵向接管（踩油门/刹车）和横向接管（转动方向盘）。",
    description: "Override分类：\n• 纵向override：驾驶员踩油门/刹车\n• 横向override：驾驶员转动方向盘（超过阈值）\n\n关键指标：\n• 接管率：override发生次数/总里程\n• 接管时长：驾驶员接管了多久\n• 接管意图：接管原因（不舒适/不信任/想自己开）\n\n数据采集：\nOverride时记录：场景、原因、接管前后状态\n用于分析系统不足 → 优化算法 → 减少误触发\n\n行业现状：\n• 各厂商MPI差异巨大（几十km到上千km）\n• 接管场景高度集中（特定路口/天气）\n• 通勤路线接管率是用户感知最强的指标",
    relatedTerms: ["mpi", "hmi", "sr", "commute-route"],
  },

  // ====== 更多算法术语 ======

  {
    id: "gnn",
    name: "图神经网络",
    aliases: ["GNN", "Graph Neural Network", "图网络"],
    category: "算法",
    difficulty: 3,
    summary: "处理图结构数据的神经网络，在自动驾驶中用于建模交通参与者之间的交互关系，提升行为预测精度。",
    description: "GNN在自动驾驶中的应用：\n\n核心思想：将交通场景建模为图——节点是车辆/行人，边是交互关系。\n\n典型应用：\n• 多目标交互预测：预测周围车辆的联合行为\n• 路网拓扑理解：理解车道连接关系\n• 场景图生成：从感知数据构建语义图\n\n优势：\n• 天然建模交互关系\n• 不规则输入（不同数量目标）\n• 可解释的注意力权重\n\n代表工作：\n• VectorNet：向量化场景图预测\n• LaneGCN：车道图卷积预测\n• HDGT：异构图Transformer预测",
    relatedTerms: ["prediction", "transformer", "bev"],
  },
  {
    id: "cnn",
    name: "卷积神经网络",
    aliases: ["CNN", "Convolutional Neural Network"],
    category: "算法",
    difficulty: 1,
    summary: "处理图像数据的核心算法，通过卷积层自动学习空间层次特征，是自动驾驶感知的基础。",
    description: "CNN在自动驾驶中的应用：\n\n主干网络（特征提取）：\n• ResNet：残差连接，训练更深层网络\n• EfficientNet：自动化架构搜索，效率最优\n• MobileNet：轻量化，适合车载部署\n\n任务网络：\n• 目标检测：YOLO/Faster R-CNN/CenterPoint\n• 语义分割：DeepLab/FCN\n• 车道线检测：LaneNet/CLRNet\n\n趋势：\n• ViT(Vision Transformer)逐步替代CNN主干\n• 但CNN在车载端部署仍有算力优势\n• ConvNeXt证明纯CNN架构仍可与Transformer竞争",
    relatedTerms: ["bev", "transformer", "e2e"],
  },
  {
    id: "rnn",
    name: "循环神经网络",
    aliases: ["RNN", "LSTM", "GRU", "循环网络"],
    category: "算法",
    difficulty: 1,
    summary: "擅长处理时序数据的神经网络，用于预测其他交通参与者的未来轨迹和行为识别。",
    description: "RNN在自动驾驶中的应用：\n\n核心特点：通过隐藏状态在时间步之间传递信息，捕捉时序数据中的依赖关系。\n\n变体：\n• LSTM：长短期记忆，解决梯度消失\n• GRU：门控循环单元，参数更少\n\n典型应用：\n• 轨迹预测：分析行人历史轨迹预测未来运动\n• 行为识别：判断前车是否准备变道\n• 时序融合：多帧特征融合提升感知稳定性\n\n趋势：\n• Transformer逐步替代RNN处理长序列\n• 但RNN在车载实时部署中仍有延迟优势\n• Mamba等状态空间模型是新方向",
    relatedTerms: ["prediction", "transformer", "cnn"],
  },
  {
    id: "rl",
    name: "强化学习",
    aliases: ["RL", "Reinforcement Learning", "强化学习"],
    category: "算法",
    difficulty: 2,
    summary: "通过智能体与环境的交互学习最优策略，可用于行为决策和轨迹规划，但安全性和可解释性仍是挑战。",
    description: "RL在自动驾驶中的应用：\n\n核心思想：不依赖标注数据，通过试错学习最优决策策略。\n\n典型应用：\n• 换道决策：学习何时变道最优\n• 交叉路口通行：学习让行/通行策略\n• 泊车策略：学习高效泊入路径\n\n安全挑战：\n• 纯RL可能学到不安全策略\n• 难以提供安全保证\n• 训练过程中需要安全约束\n\n解决方案：\n• 安全RL：加入安全约束和安全护栏\n• 模仿学习+RL：先从人类驾驶数据学习，再RL微调\n• 离线RL：从已有数据学习，不需在线交互\n\n代表工作：地平线HSD的强化学习模块用于驾驶质感优化。",
    relatedTerms: ["behavior-planning", "e2e", "data-loop"],
    relatedBrands: ["horizon"],
  },
  {
    id: "world-model",
    name: "世界模型",
    aliases: ["World Model", "世界表征模型", "驾驶世界模型"],
    category: "算法",
    difficulty: 3,
    summary: "对驾驶环境的内部表征模型，能预测自身行动的后果，是端到端自动驾驶的前沿方向。",
    description: "世界模型的核心思想：\n• 学习环境的动态规律\n• 给定当前状态和动作，预测未来状态\n• 类似人类驾驶员的\"脑内模拟\"\n\n在自动驾驶中的应用：\n• 规划：通过想象不同动作的后果选择最优行为\n• 仿真：生成逼真的训练场景\n• 长尾场景：模拟罕见但危险的场景\n\n代表工作：\n• GAIA-1（Wayve）：生成式自动驾驶世界模型\n• UniSim：实时传感器仿真\n• MILE：从视频中学习世界模型\n\n挑战：\n• 计算量巨大\n• 长期预测准确性不足\n• 如何保证世界模型与真实世界一致",
    relatedTerms: ["e2e", "simulation", "rl"],
  },

  // ====== 更多评测术语 ======

  {
    id: "mcp",
    name: "接管里程覆盖率",
    aliases: ["MCP", "Miles Per Intervention Coverage"],
    category: "评测",
    difficulty: 2,
    summary: "接管事件发生的路段占总里程的比例，更细致地反映系统在不同路段的表现和能力薄弱环节。",
    description: "MCP指标：\n\n与MPI的区别：\n• MPI：总里程/接管次数（全局指标）\n• MCP：接管路段/总里程（分布指标）\n\nMCP的价值：\n• 识别系统能力薄弱的特定路段\n• 区分\"偶尔难\"和\"持续难\"的路段\n• 指导算法优化优先级\n\n示例：\n• 同样10次接管/1000km：\n  - 情况A：集中在3个特定路口 → MCP低，问题局部化，易修复\n  - 情况B：分散在不同路段 → MCP高，问题普遍化，需系统性优化",
    relatedTerms: ["mpi", "override", "commute-route"],
  },
  {
    id: "comfort-metrics",
    name: "舒适性评价指标",
    aliases: ["Comfort Metrics", "体感指标", "乘坐舒适度"],
    category: "评测",
    difficulty: 2,
    summary: "衡量智驾系统控制平顺性的指标体系，包括加减速冲击度、横向加速度变化率等，直接影响用户接受度。",
    description: "舒适性评价维度：\n\n纵向舒适：\n• 加速度绝对值（<2m/s²为舒适）\n• 加速度变化率(Jerk，<3m/s³为舒适)\n• 紧急制动频次\n\n横向舒适：\n• 横向加速度（<2m/s²为舒适）\n• 横摆角速度变化率\n• 压线频次\n\n综合指标：\n• 急加速/急刹车/急转弯次数\n• 乘客主观评分\n• 晕车指数\n\n行业现状：\n• 各厂商对舒适性的定义和标准不统一\n• 安全和舒适经常矛盾——紧急制动安全但不舒适\n• 通勤场景舒适性是用户投诉集中点",
    relatedTerms: ["mpi", "pnc", "motion-control"],
  },

  // ====== 更多感知术语 ======

  {
    id: "god",
    name: "通用障碍物检测",
    aliases: ["GOD", "General Obstacle Detection", "通用障碍物识别"],
    category: "感知",
    difficulty: 2,
    summary: "不预设障碍物类别，直接判断区域是否可通行，解决长尾障碍物识别问题。",
    description: "GOD vs 传统目标检测：\n• 传统：预设类别（车/人/自行车等），只能识别训练过的类别\n• GOD：不分类别，直接判断\"能不能开过去\"\n\nGOD的价值：\n• 解决长尾场景：侧翻卡车/掉落货物/异形障碍物\n• 不依赖标注数据的类别覆盖\n• 安全兜底：即使不认识也能避让\n\n实现方式：\n• 基于占用网络(Occupancy Network)：预测3D空间的占用状态\n• 基于自由空间(Free Space)：直接估计可行驶区域\n• 基于深度估计：单目深度估计判断距离\n\n华为ADS的GOD网络是其核心卖点之一，能识别异形障碍物并避让。",
    relatedTerms: ["bev", "occupancy-network", "e2e"],
    relatedBrands: ["huawei"],
  },
  {
    id: "occupancy-network",
    name: "占用网络",
    aliases: ["Occupancy Network", "OccNet", "占用预测", "3D Occupancy"],
    category: "感知",
    difficulty: 3,
    summary: "预测3D空间中每个体素(Voxel)的占用状态，是通用障碍物检测的核心技术，Tesla/OccNet等的基石。",
    description: "占用网络原理：\n• 将3D空间划分为均匀体素网格\n• 预测每个体素是否被占用（二值/多类）\n• 结果类似Minecraft的3D方块世界\n\n优势：\n• 不受障碍物类别限制\n• 表达任意形状的障碍物\n• 天然支持3D空间理解\n\n技术演进：\n1. PointPillars/LIFT-Splat-Shoot：早期BEV占用\n2. OccNet(特斯拉)：端到端3D占用预测\n3. Sparse Occ：稀疏占用，降低计算量\n4. GaussianOcc：3D高斯表征占用\n\n行业采用：\n• 特斯拉率先大规模应用\n• 华为/小鹏/理想纷纷跟进\n• 已成为BEV+Occ的标准感知架构",
    relatedTerms: ["god", "bev", "lidar"],
    relatedBrands: ["tesla", "huawei"],
  },
  {
    id: "sensor-fusion",
    name: "传感器融合",
    aliases: ["Sensor Fusion", "多传感器融合", "前融合", "后融合"],
    category: "感知",
    difficulty: 2,
    summary: "将多种传感器信息整合的技术，分为前融合（数据层融合）和后融合（目标层融合），是提升感知性能的关键。",
    description: "传感器融合两大方式：\n\n前融合（数据层/特征层融合）：\n• 将不同传感器的原始数据或早期特征统一处理\n• 信息损失少，但计算量大\n• 代表：BEV Fusion（摄像头+激光雷达特征融合）\n\n后融合（目标层融合）：\n• 各传感器独立完成检测，结果综合判断\n• 计算量小，但信息损失\n• 代表：传统ADAS方案\n\n趋势：\n• 从后融合向前融合迁移\n• BEV特征级融合成为主流\n• 端到端方案中融合发生在更早阶段\n\n关键挑战：\n• 传感器时间同步（不同帧率）\n• 空间标定精度（外参误差累积）\n• 异常传感器检测与降级处理",
    relatedTerms: ["lidar", "camera", "bev"],
  },
  {
    id: "camera",
    name: "车载摄像头",
    aliases: ["Camera", "视觉传感器", "ADAS Camera"],
    category: "传感器",
    difficulty: 1,
    summary: "获取丰富视觉信息的核心传感器，包括道路标线/交通标志/信号灯/行人/车辆等，深度学习赋予强大视觉理解能力。",
    description: "车载摄像头分类：\n• 前视摄像头：远距离目标检测，高分辨率长焦\n• 后视摄像头：后方来车检测\n• 侧视摄像头：盲区覆盖\n• 环视摄像头：近距离障碍物/泊车辅助，广角\n\n关键参数：\n• 分辨率：200万/500万/800万像素\n• 视场角(FOV)：广角120°+ vs 窄角30°\n• 帧率：30fps/60fps\n• 动态范围(HDR)：逆光场景\n\n视觉方案 vs 激光雷达方案：\n• 纯视觉(特斯拉/极越)：成本低/信息丰富/受天气影响大\n• 视觉+激光雷达(华为/小鹏/理想)：精度高/冗余强/成本高\n\n趋势：800万像素成为高端智驾标配，1200万/1600万已在路上。",
    relatedTerms: ["lidar", "sensor-fusion", "bev"],
  },

  // ====== 更多行业术语 ======

  {
    id: "white-list",
    name: "白名单机制",
    aliases: ["Whitelist", "可信目标列表", "白名单"],
    category: "架构",
    difficulty: 1,
    summary: "经过验证的可信目标列表，用于障碍物识别，提高识别效率和准确性，减少误识别。",
    description: "白名单机制在智驾中的应用：\n\n• 障碍物白名单：已知安全的目标（如特定类型车辆）\n• 场景白名单：经过验证可安全运行的场景\n• 感知白名单：高置信度识别结果\n\n作用：\n• 加速识别：白名单目标快速确认\n• 减少误报：过滤已知误检\n• 安全兜底：非白名单目标触发更保守策略\n\n局限：\n• 覆盖有限，无法穷举所有安全目标\n• 可能误过滤（将真实目标标记为安全）",
    relatedTerms: ["god", "odd"],
  },
  {
    id: "domain-controller",
    name: "域控制器",
    aliases: ["Domain Controller", "DCU", "智驾域控"],
    category: "架构",
    difficulty: 1,
    summary: "车载计算核心，负责感知/规划/控制等计算任务，是智能汽车的\"大脑\"，通常采用高性能芯片提供算力。",
    description: "域控制器分类：\n• 智驾域控(DCU)：感知+规划+控制\n• 座舱域控：信息娱乐+HUD+语音\n• 底盘域控：制动+转向+悬挂\n\n智驾域控核心组件：\n• SoC芯片：NVIDIA Orin/Thor、地平线征程系列\n• MCU安全芯片：Infineon AURIX\n• 电源管理：多路冗余供电\n• 通信接口：车载以太网/CAN-FD\n\n行业趋势：\n• 从分布式ECU向域控集中\n• 从单域控向中央计算演进\n• 舱驾融合：智驾+座舱共用大算力芯片",
    relatedTerms: ["orin-x", "thor", "journey6"],
  },
  {
    id: "5g",
    name: "5G通信",
    aliases: ["5G", "第五代移动通信"],
    category: "通信",
    difficulty: 1,
    summary: "第五代移动通信技术，低延迟(1ms级)/高带宽/大连接，为V2X和云端计算提供通信基础。",
    description: "5G在自动驾驶中的作用：\n\n关键特性：\n• eMBB(增强移动带宽)：支持大规模数据传输（4K/8K视频）\n• URLLC(超可靠低延迟)：1ms级延迟，支持实时控制\n• mMTC(海量连接)：支持大规模IoT设备\n\n应用场景：\n• V2X通信：C-V2X基于5G NR\n• 远程驾驶：5G低延迟远程操控\n• 云端计算：大算力卸载到云端\n• OTA升级：高速下载大模型\n\n现状：\n• 5G覆盖仍不完整，尤其农村/高速\n• 资费和流量成本限制大数据上传\n• 5G-A(5.5G)进一步降低延迟",
    relatedTerms: ["v2x", "ota"],
  },

  // ========== 决策（规划与决策） ==========
  {
    id: "pnc",
    name: "PNC",
    aliases: ["Planning and Control", "规划与控制", "规划控制"],
    category: "决策",
    difficulty: 2,
    summary: "规划与控制的统称，是智驾系统从感知到执行的桥梁，包含任务规划、行为规划、轨迹规划和运动控制全链路。",
    description: "PNC（Planning and Control）是自动驾驶系统中\"思考+执行\"的核心模块：\n\n规划（Planning）分为三层：\n• 任务规划：全局路线规划（从A到B走哪条路）\n• 行为规划：决定做什么动作（跟车/变道/让行/停车）\n• 轨迹规划：生成具体行驶轨迹（位置+速度+加速度的时间曲线）\n\n控制（Control）负责执行：\n• 横向控制：控制方向盘转角，保持车道/变道\n• 纵向控制：控制油门刹车，保持车距/加减速\n• 横纵耦合：复杂场景横向纵向协同控制\n\nPNC的核心挑战：\n• 安全性约束（不碰撞/不越界）\n• 运动学约束（车辆物理极限）\n• 舒适性约束（加速度/加加速度限制）\n• 实时性要求（毫秒级响应）",
    keyPoints: [
      "规划是\"想\"，控制是\"做\"",
      "三层规划架构：任务→行为→轨迹",
      "横纵解耦 vs 横纵耦合是工程核心取舍",
      "端到端正在挑战传统PNC分层架构"
    ],
    relatedTerms: ["behavior_planning", "trajectory_planning", "motion_control", "mpc"],
    relatedBrands: ["huawei", "xiaopeng", "tesla"],
    evolution: "规则PNC→优化PNC(MPC)→学习PNC(强化学习)→端到端直接输出控制",
    controversy: "端到端是否还需要显式PNC模块，行业尚无定论"
  },
  {
    id: "behavior_planning",
    name: "行为规划",
    aliases: ["Behavior Planning", "决策规划", "行为决策"],
    category: "决策",
    difficulty: 2,
    summary: "决定车辆应采取的宏观行为（跟车/变道/超车/让行/停车），是感知与轨迹规划之间的决策层。",
    description: "行为规划是智驾系统的\"大脑决策中心\"，负责将感知结果转化为驾驶意图：\n\n核心任务：\n• 评估当前场景的可行行为集合\n• 综合安全性/效率/舒适性/合法性选择最优行为\n• 输出行为指令给轨迹规划层\n\n实现方法：\n• 有限状态机（FSM）：简单场景常用，状态间切换规则明确\n• 决策树：多层次条件判断\n• 基于规则：人类工程师编写if-else逻辑\n• 基于学习：强化学习/模仿学习获取策略\n\n典型行为集合：\n• 跟车（Follow）\n• 变道（Lane Change）\n• 超车（Overtake）\n• 让行（Yield）\n• 停车（Stop）\n• 绕行（Nudge）\n\n关键挑战：\n• 交互场景（他车意图不确定）\n• 多目标冲突（安全vs效率vs舒适）\n• 决策犹豫（频繁切换行为导致不稳定）",
    keyPoints: [
      "行为规划是\"做不做\"的决策，轨迹规划是\"怎么做\"",
      "交互场景是最大挑战——他车意图不可预测",
      "选道犹豫是用户投诉最多的行为规划问题",
      "端到端架构试图用神经网络替代显式行为规划"
    ],
    relatedTerms: ["pnc", "trajectory_planning", "override", "e2e"],
    relatedBrands: ["huawei", "xiaopeng", "tesla"],
    evolution: "FSM→决策树→规则引擎→强化学习→端到端隐式决策",
    controversy: "显式行为规划(可解释) vs 隐式行为规划(端到端)的安全保障差异"
  },
  {
    id: "trajectory_planning",
    name: "轨迹规划",
    aliases: ["Trajectory Planning", "路径规划", "运动规划"],
    category: "决策",
    difficulty: 2,
    summary: "生成满足行为决策的详细行驶轨迹（位置+速度+加速度的时间曲线），是行为规划和运动控制之间的桥梁。",
    description: "轨迹规划将抽象的行为意图转化为具体的运动轨迹：\n\n三重约束：\n• 安全性约束：不碰撞、不越界、不违规\n• 运动学约束：车辆物理特性（最小转弯半径、最大加速度）\n• 动力学约束：加速度/曲率/加加速度限制\n\n常用算法：\n• 基于采样：RRT（快速随机树）、RRT*（最优RRT）\n• 基于搜索：A*、Hybrid A*（考虑车辆运动学）\n• 基于优化：二次规划(QP)、非线性规划(NLP)、MPC\n• 基于学习：神经网络直接输出轨迹\n\n输出格式：\n• 位置序列：(x₀,y₀), (x₁,y₁), ..., (xₙ,yₙ)\n• 速度曲线：v₀, v₁, ..., vₙ\n• 加速度曲线：a₀, a₁, ..., aₙ\n• 时间戳：t₀, t₁, ..., tₙ\n\n关键指标：\n• 轨迹平滑度（加加速度Jerk）\n• 轨迹可行性（是否满足运动学约束）\n• 轨迹安全性（与障碍物的最小距离）",
    keyPoints: [
      "轨迹 = 路径(几何) + 速度(时间) + 加速度(动力学)",
      "采样法适合复杂场景但计算量大，优化法快但可能陷入局部最优",
      "Hybrid A*是当前量产最常用的搜索算法",
      "端到端架构直接输出轨迹，跳过显式轨迹规划"
    ],
    relatedTerms: ["pnc", "behavior_planning", "motion_control", "mpc"],
    relatedBrands: ["huawei", "xiaopeng", "tesla"],
    evolution: "RRT/A*→Hybrid A*→QP/MPC优化→神经网络直接输出",
    controversy: "优化方法的可解释性 vs 学习方法的泛化能力"
  },
  {
    id: "motion_control",
    name: "运动控制",
    aliases: ["Motion Control", "车辆控制", "底盘控制"],
    category: "控制",
    difficulty: 2,
    summary: "将规划轨迹转化为具体车辆控制指令（方向盘转角/油门开度/刹车力度），直接与执行器交互的最底层模块。",
    description: "运动控制是智驾系统的\"手脚\"，负责精确执行规划结果：\n\n控制维度：\n• 横向控制：方向盘转角→车辆航向→车道保持/变道\n• 纵向控制：油门/刹车→车辆速度→跟车/定速/减速\n• 横纵耦合：复杂场景需同时精确控制横向和纵向\n\n常用控制方法：\n• PID控制：最经典，简单可靠，参数整定方便\n  - 横向：Stanley/Pure Pursuit + PID\n  - 纵向：速度PID + 距离PID\n• MPC（模型预测控制）：考虑未来多步，处理约束\n  - 可显式处理安全约束/物理约束\n  - 计算量较大，实时性要求高\n• 自适应控制：适应不同路面/载荷/车速\n• LQR（线性二次调节器）：最优控制理论\n\n关键性能指标：\n• 跟踪精度：实际轨迹与规划轨迹的偏差\n• 响应速度：从指令到执行的时间延迟\n• 舒适性：加速度/加加速度(Jerk)指标\n• 稳定性：各种工况下不发散/不震荡",
    keyPoints: [
      "运动控制是\"最后一公里\"，直接决定驾乘体验",
      "PID简单但不够优，MPC最优但计算重",
      "横纵解耦简化设计但牺牲耦合场景性能",
      "低附路面（冰雪/湿滑）控制是难点"
    ],
    relatedTerms: ["pnc", "trajectory_planning", "mpc"],
    relatedBrands: ["huawei", "xiaopeng", "tesla"],
    evolution: "PID→LQR→MPC→自适应MPC→学习型控制",
    controversy: "传统控制方法在端到端架构中的角色定位"
  },
  {
    id: "mpc",
    name: "模型预测控制",
    aliases: ["MPC", "Model Predictive Control", "滚动优化"],
    category: "控制",
    difficulty: 3,
    summary: "基于车辆动力学模型，在有限时域内滚动优化控制输入，可显式处理安全约束和物理约束的最优控制方法。",
    description: "MPC是当前量产智驾中最主流的高级控制方法：\n\n核心思想：\n1. 在当前时刻，基于模型预测未来N步的系统状态\n2. 求解一个带约束的优化问题，得到最优控制序列\n3. 只执行第一步控制，然后滚动到下一时刻重新求解\n\n优势：\n• 可显式处理约束（安全距离/加速度极限/方向盘转角极限）\n• 考虑未来多步影响（前瞻性）\n• 可处理多目标优化（安全+舒适+效率）\n• MIMO系统（多输入多输出）天然适用\n\n劣势：\n• 计算量大（每步需在线求解优化问题）\n• 依赖模型精度（模型偏差影响性能）\n• 实时性挑战（需在控制周期内完成求解）\n\n变体：\n• 线性MPC：速度快但近似误差大\n• 非线性MPC(NMPC)：精度高但计算慢\n• 自适应MPC：在线调整模型参数\n• 鲁棒MPC：考虑模型不确定性\n\n在智驾中的应用：\n• 轨迹跟踪：最常用的MPC场景\n• 轨迹规划+控制一体化：同时优化轨迹和控制\n• 约束满足：碰撞避免、道路边界等硬约束",
    keyPoints: [
      "MPC = 预测模型 + 滚动优化 + 约束处理",
      "预测时域越长越\"聪明\"但计算越重",
      "是端到端架构的\"兜底\"安全保障手段",
      "求解器效率是量产落地的关键瓶颈"
    ],
    relatedTerms: ["motion_control", "trajectory_planning", "pnc"],
    relatedBrands: ["huawei", "xiaopeng", "tesla"],
    evolution: "线性MPC→非线性MPC→自适应MPC→数据驱动MPC",
    controversy: "端到端是否还需要MPC作为安全兜底，还是纯神经网络就够了"
  },
  {
    id: "lateral_control",
    name: "横向控制",
    aliases: ["Lateral Control", "转向控制", "方向盘控制"],
    category: "控制",
    difficulty: 2,
    summary: "控制车辆方向盘转角实现车道保持、变道等横向运动，与纵向控制共同构成智驾控制的双核心。",
    description: "横向控制负责车辆的\"左右\"运动：\n\n核心任务：\n• 车道保持：使车辆沿车道中心线行驶\n• 车道跟随：弯道中平滑跟踪道路曲率\n• 变道执行：按照规划轨迹完成横向位移\n• 避障绕行：紧急避让时的横向偏移\n\n常用方法：\n• Pure Pursuit（纯追踪）：最经典，跟踪前方预瞄点\n• Stanley Method：斯坦福大学提出，兼顾航向误差和横向误差\n• LQR横向控制：最优线性反馈控制\n• MPC横向控制：考虑约束的滚动优化\n\n关键指标：\n• 横向偏差：实际位置与目标轨迹的横向距离\n• 航向偏差：实际航向角与目标航向角的差值\n• 控制平滑度：方向盘转角变化率\n\n典型问题：\n• 大曲率弯道：高速过弯控制精度下降\n• 压线：横向偏差过大导致车轮压线\n• 方向盘抖动：控制输出不平滑",
    keyPoints: [
      "预瞄距离是Pure Pursuit的核心参数",
      "高速和低速需要不同的控制参数",
      "弯道场景是横向控制的主要难点",
      "与纵向控制的协调是横纵耦合问题"
    ],
    relatedTerms: ["motion_control", "longitudinal_control", "mpc"],
  },
  {
    id: "longitudinal_control",
    name: "纵向控制",
    aliases: ["Longitudinal Control", "速度控制", "油门刹车控制"],
    category: "控制",
    difficulty: 2,
    summary: "控制车辆油门和刹车实现跟车、定速、减速等纵向运动，是ACC/AEB等功能的控制基础。",
    description: "纵向控制负责车辆的\"前后\"运动：\n\n核心任务：\n• 定速巡航：维持设定车速\n• 跟车控制：保持与前车的安全距离和时间间隙\n• 减速停车：在红灯/障碍物前安全减速至停止\n• 紧急制动：AEB场景下的最大减速度制动\n\n常用方法：\n• PID级联控制：外环距离控制+内环速度控制\n• MPC纵向控制：多约束优化\n• 滑模控制：对模型不确定性鲁棒\n\n关键指标：\n• 车间距：与前方车辆的实际距离\n• THW（Time Headway）：车头时距\n• TTC（Time To Collision）：碰撞剩余时间\n• 加速度/Jerk：纵向加速度及其变化率\n\n典型问题：\n• 前车切入误响应：旁边车道车辆刚切入就急刹\n• 走走停停：拥堵场景下的起停平顺性\n• 坡道溜车：坡道起步时的纵向控制",
    keyPoints: [
      "THW和TTC是纵向安全的两个核心指标",
      "走走停停场景的舒适性是用户感知最强的",
      "紧急制动要求最大减速度但也要考虑后车",
      "低附路面（冰雪）制动距离大幅增加"
    ],
    relatedTerms: ["motion_control", "lateral_control", "aeb", "acc"],
  },

  // ========== 定位系统 ==========
  {
    id: "gnss",
    name: "GNSS",
    aliases: ["Global Navigation Satellite System", "全球导航卫星系统", "GPS", "北斗"],
    category: "定位",
    difficulty: 1,
    summary: "通过接收多颗卫星信号计算接收机位置的全球导航卫星系统，配合RTK可达厘米级精度。",
    description: "GNSS是自动驾驶定位的基础手段之一：\n\n四大系统：\n• GPS（美国）：最早最成熟，民用精度约5-10m\n• 北斗（中国）：亚太地区精度更优，已全球组网\n• 伽利略（欧洲）：高精度民用服务\n• 格洛纳斯（俄罗斯）：高纬度地区优势\n\nRTK差分技术：\n• 基准站（已知位置）接收卫星信号\n• 计算定位误差并实时发送给移动站\n• 移动站根据差分数据修正定位结果\n• 精度可达厘米级（1-3cm）\n\n在智驾中的角色：\n• 提供全局初始位置（经纬度）\n• 与INS组合实现高频率高精度定位\n• 隧道/高架遮挡时依赖INS推算\n• 与高精地图匹配实现车道级定位\n\n局限性：\n• 城市峡谷（高楼遮挡）信号差\n• 隧道/地下车库完全无信号\n• 多径效应导致定位跳变",
    keyPoints: [
      "单GNSS精度不够，必须配合RTK和INS",
      "北斗在中国区域精度已优于GPS",
      "GNSS-RTK+INS+高精地图匹配是标配方案",
      "城市峡谷是GNSS定位的天然弱点"
    ],
    relatedTerms: ["ins", "hd_map", "rtk"],
  },
  {
    id: "ins",
    name: "INS",
    aliases: ["Inertial Navigation System", "惯性导航系统", "惯导"],
    category: "定位",
    difficulty: 2,
    summary: "通过积分加速度计和陀螺仪数据推算位置和姿态变化，不依赖外部信号、更新频率高的自主导航系统。",
    description: "INS是自动驾驶定位系统的关键组成部分：\n\n核心传感器：\n• 加速度计：测量三轴加速度\n• 陀螺仪：测量三轴角速度\n• 通过积分运算推算位置、速度、姿态\n\n优势：\n• 更新频率高（100-500Hz），远高于GNSS\n• 不依赖外部信号，隧道/地下可用\n• 短期精度高，适合平滑定位结果\n\n劣势：\n• 误差随时间累积（漂移）\n• 高精度INS成本高（战术级>10万元）\n• 需要GNSS定期校准消除累积误差\n\n在智驾中的角色：\n• GNSS信号好时：INS平滑定位结果\n• GNSS信号中断时：短时维持定位输出\n• 与GNSS组合：GNSS-RTK+INS紧组合/松组合\n• 为感知提供车辆姿态信息\n\n精度等级：\n• 消费级：漂移快，不适合智驾\n• 工业级：1°/h级别，中低端方案\n• 战术级：0.1°/h级别，高端方案\n• 导航级：0.01°/h级别，军用/高精需求",
    keyPoints: [
      "INS是GNSS的最佳搭档——互补关系",
      "精度和成本是核心矛盾",
      "紧组合 vs 松组合是工程取舍",
      "无GNSS时漂移速度决定可用时长"
    ],
    relatedTerms: ["gnss", "hd_map"],
  },
  {
    id: "hd_map",
    name: "HD Map",
    aliases: ["High Definition Map", "高精地图", "高精度地图"],
    category: "定位",
    difficulty: 2,
    summary: "厘米级精度的道路信息地图，包含车道线、交通标志、曲率等丰富语义，用于定位、规划和感知的先验知识。",
    description: "HD Map是自动驾驶的核心支撑技术：\n\n四层信息结构：\n• 道路层：几何形状、属性（限速/类型/曲率）\n• 定位层：标志物信息（电线杆/交通标志/路面标记）\n• 语义层：车道连接关系、交通规则、信号灯相位\n• 动态层：实时交通信息、动态事件\n\n在智驾中的作用：\n• 定位：与实时感知数据匹配，推算精确位置\n• 规划：提前知道路况，提前决策\n• 感知：超视距信息补充，弥补传感器探测局限\n• 安全：传感器失效时的备选信息源\n\n与SD地图对比：\n• SD地图：米级精度，导航用，不参与驾驶决策\n• HD Map：厘米级精度，智驾用，参与实时控制\n\n当前争议：\n• \"重地图\" vs \"轻地图\" vs \"无图\"路线\n• 图商更新频率跟不上道路变化\n• 高精地图资质和政策限制\n• 特斯拉/小鹏推动\"无图\"方案",
    keyPoints: [
      "HD Map = 定位 + 规划 + 感知 + 安全的四重保障",
      "\"去图化\"是当前行业大趋势",
      "地图鲜度(更新频率)是核心痛点",
      "轻地图方案试图用实时感知替代部分地图功能"
    ],
    relatedTerms: ["gnss", "ins", "bev"],
    relatedBrands: ["tesla", "xiaopeng", "baidu"],
    evolution: "重地图→轻地图→无图→实时在线建图",
    controversy: "去图化路线能否完全替代高精地图的作用"
  },
  {
    id: "rtk",
    name: "RTK",
    aliases: ["Real-Time Kinematic", "实时动态差分", "RTK差分"],
    category: "定位",
    difficulty: 2,
    summary: "利用基准站差分数据实时修正卫星定位误差，将GNSS精度从米级提升到厘米级的关键技术。",
    description: "RTK是GNSS高精度定位的使能技术：\n\n工作原理：\n1. 基准站架设在已知坐标点\n2. 基准站接收卫星信号，计算出定位误差\n3. 通过数据链将差分数据发送给移动站\n4. 移动站用差分数据修正自己的定位结果\n5. 实现厘米级定位精度（1-3cm）\n\n分类：\n• 传统RTK：需自建基准站，覆盖范围有限（~20km）\n• 网络RTK（CORS）：利用连续运行参考站网，覆盖广\n• PPP-RTK：精密单点定位+RTK，无需附近基准站\n\n在智驾中的应用：\n• 与INS组合提供高精度绝对位置\n• 为高精地图匹配提供初始位置\n• 车道级导航定位\n• 自动泊车入库定位\n\n局限性：\n• 需要基准站或CORS网络支持\n• 城市峡谷环境效果下降\n• 初始化需要一定时间（冷启动）",
    keyPoints: [
      "RTK让GNSS从\"路级\"定位升级到\"车道级\"定位",
      "CORS网络是大规模商用的基础设施",
      "RTK+INS紧组合是当前最优定位方案",
      "初始化速度和城市峡谷是主要挑战"
    ],
    relatedTerms: ["gnss", "ins"],
  },

  // ========== 通信/车联网 ==========
  {
    id: "v2x",
    name: "V2X",
    aliases: ["Vehicle to Everything", "车联网", "车路协同"],
    category: "通信",
    difficulty: 2,
    summary: "车辆与周围环境进行信息交换的技术体系（V2V/V2I/V2P/V2N），突破单车感知局限，实现超视距信息获取。",
    description: "V2X是实现智能网联汽车的关键使能技术：\n\n四大通信模式：\n• V2V（车与车）：碰撞预警、协同换道、编队行驶\n• V2I（车与基础设施）：信号灯预警、绿波通行\n• V2P（车与行人）：行人保护预警\n• V2N（车与网络）：云端计算、远程诊断、OTA\n\n两大技术路线：\n• C-V2X（蜂窝V2X）：基于5G/LTE，中国主推\n  - PC5直连：低延迟车车/车路直连\n  - Uu接口：通过基站通信\n• DSRC（专用短程通信）：基于802.11p，美国曾主推\n\n在智驾中的价值：\n• 超视距感知：提前知道1km外的路况\n• 协同决策：多车协同变道/通过路口\n• 安全冗余：传感器失效时的补充信息源\n\n当前挑战：\n• 渗透率低，路上大部分车没有V2X\n• 标准不统一，跨厂商互通困难\n• 基础设施建设投入大\n• 数据安全和隐私保护",
    keyPoints: [
      "V2X = 单车智能的补充，不是替代",
      "渗透率是V2X实用化的最大瓶颈",
      "C-V2X是中国标准路线",
      "V2X最有价值的场景是盲区预警和信号灯信息"
    ],
    relatedTerms: ["5g", "ota"],
    relatedBrands: ["baidu", "huawei"],
  },

  // ========== 开发体系 ==========
  {
    id: "data_loop",
    name: "数据闭环",
    aliases: ["Data Loop", "数据飞轮", "Data Flywheel"],
    category: "开发",
    difficulty: 2,
    summary: "通过持续的数据采集→分析→优化→验证循环，驱动算法迭代提升的核心方法论，是量产智驾的研发基石。",
    description: "数据闭环是自动驾驶算法迭代的核心方法论：\n\n完整流程：\n1. 外场实车采集路测数据（含通勤路线）\n2. 上传云端完成数据清洗、标注、分析\n3. 算法迭代优化\n4. 内场回灌、仿真工具回归测试\n5. 多源场景构建标准化评测数据集\n6. 内场验证合格后外场实车复测\n7. OTA远程升级下发至车辆\n8. 持续循环迭代\n\n关键环节：\n• 数据采集：通勤路线是主力数据源\n• 数据标注：人工标注+自动标注+半自动标注\n• 评测数据集：多源筛选→标注→标准化→绑定指标\n• 仿真验证：SIL→HIL→实车验证\n\n数据飞轮效应：\n• 更多车辆 → 更多数据 → 更好算法 → 更好体验 → 更多用户 → 更多车辆\n• 特斯拉是数据飞轮的典型代表\n\n核心指标：\n• 数据采集量（公里数/小时数）\n• 标注效率（自动化率）\n• 迭代周期（从问题发现到OTA推送）\n• MPI改善率（每次迭代MPI提升幅度）",
    keyPoints: [
      "数据闭环是量产智驾的\"发动机\"",
      "通勤路线是最核心的数据源（高频+稳定+可复现）",
      "标注成本和效率是瓶颈",
      "迭代周期直接决定竞争力"
    ],
    relatedTerms: ["shadow_mode", "simulation", "ota", "mpi"],
    relatedBrands: ["tesla", "huawei", "xiaopeng"],
  },
  {
    id: "commute_route",
    name: "通勤路线",
    aliases: ["Commuting Route", "通勤场景", "高频路线"],
    category: "开发",
    difficulty: 1,
    summary: "用户日常上下班的固定重复路线，路况稳定场景重复度高，是外场数据采集主力来源和内场评测核心场景。",
    description: "通勤路线是连接用户日常生活与智驾技术的核心场景：\n\n定义：固定高频、日常上下班的固定重复路线\n\n特点：\n• 路线固定、场景熟悉\n• 包含跟车、路口、拥堵、变道等高频场景\n• 数据重复度高、样本量大\n• 直接影响用户日常体验\n\n在内场外场中的作用：\n• 外场：通勤路线是量产车数据采集主力场景\n• 内场：优先基于通勤路线构建评测数据集\n• 迭代优先级：通勤高频场景优先优化\n\n为什么通勤路线最重要？\n• 用户感知最强——每天用、每次都用\n• 数据最丰富——同一场景海量重复数据\n• 最易优化——场景固定，问题可复现\n• MPI最相关——通勤MPI是用户最关心的指标\n\n极简记忆版：用户日常固定上下班的高频重复路线，路况稳定场景固定，是外场数据采集主要来源、内场评测数据集核心场景，优先迭代优化，直接决定日常智驾体验与接管指标。",
    keyPoints: [
      "通勤路线 = 智驾体验的\"基本盘\"",
      "通勤MPI比全域MPI更有用户参考价值",
      "同一路线反复跑=数据飞轮的最佳燃料",
      "通勤路线优化是各厂商当前最优先的迭代方向"
    ],
    relatedTerms: ["data_loop", "mpi", "shadow_mode"],
  },
  {
    id: "sil_hil",
    name: "SIL/HIL",
    aliases: ["Software-in-the-Loop", "Hardware-in-the-Loop", "软件在环/硬件在环"],
    category: "开发",
    difficulty: 2,
    summary: "SIL在软件环境验证算法，HIL加入真实硬件闭环测试，与MIL共同构成自动驾驶验证链V模型。",
    description: "SIL和HIL是自动驾驶验证链的核心环节：\n\n验证链V模型：\n• MIL（模型在环）：在Simulink/Matlab中验证控制逻辑\n• SIL（软件在环）：编译后的代码在PC上运行验证\n• HIL（硬件在环）：真实ECU+仿真环境闭环测试\n• VIL（车辆在环）：实车+仿真场景组合测试\n\nSIL（软件在环）：\n• 优势：速度快、成本低、场景可控\n• 劣势：不验证硬件实时性和接口\n• 用途：算法功能验证、回归测试\n\nHIL（硬件在环）：\n• 优势：验证真实硬件的实时性和接口\n• 劣势：成本高、搭建复杂\n• 用途：ECU功能验证、故障注入测试\n\n在智驾开发中的角色：\n• 内场验证的主力工具\n• 回归测试的自动化执行\n• 边界条件/Corner Case的穷举测试\n• OTA前的必经验证环节",
    keyPoints: [
      "MIL→SIL→HIL→VIL是验证深度递增的链路",
      "SIL快但不够真实，HIL真实但成本高",
      "仿真测试永远不能完全替代实车测试",
      "Sim2Real Gap是仿真验证的核心挑战"
    ],
    relatedTerms: ["simulation", "data_loop"],
  },

  // ========== 人机交互 ==========
  {
    id: "sr_display",
    name: "SR",
    aliases: ["Situation Recognition", "态势感知", "SR界面", "环境渲染"],
    category: "人机",
    difficulty: 1,
    summary: "将传感器处理后的信息渲染显示到中控/仪表，让用户看到\"系统看到了什么\"，增强信任感的关键HMI功能。",
    description: "SR（态势感知显示）是智驾HMI的核心功能：\n\n定位：智驾系统与驾驶员之间的\"翻译官\"\n\n显示内容：\n• 周围车辆位置、速度、意图\n• 道路结构（车道线/道路边界）\n• 交通信号（红绿灯/标志牌）\n• 行人/非机动车位置\n• 规划轨迹（系统打算怎么走）\n• 系统状态（可用/不可用/即将退出）\n\n为什么SR重要？\n• 增强信任：用户看到\"系统看到了\"，才会放心\n• 接管依据：SR显示异常是用户判断是否接管的关键\n• 体验感知：SR渲染质量直接影响用户对智驾的评价\n• 安全提醒：HOD脱手检测+SR异常显示=接管信号\n\n典型问题：\n• SR显示的车辆与实际位置有延迟\n• SR漏显/误显导致用户恐慌\n• SR渲染跳变频繁导致不安\n• 暗光/逆光场景SR渲染质量下降",
    keyPoints: [
      "SR是\"系统看到了什么\"的可视化窗口",
      "SR质量直接影响用户对智驾的信任度",
      "SR延迟/跳变/漏显是用户投诉高频问题",
      "好的SR=让用户安心，不好的SR=让用户焦虑"
    ],
    relatedTerms: ["hmi", "override"],
  },
  {
    id: "override",
    name: "Override",
    aliases: ["接管", "驾驶员接管", "用户接管"],
    category: "人机",
    difficulty: 1,
    summary: "驾驶员主动干预智驾系统的行为，是衡量系统可靠性的核心数据来源，记录场景/原因/时长用于算法优化。",
    description: "Override是智驾系统迭代优化的核心数据来源：\n\n定义：驾驶员主动干预智驾系统控制\n\n分类：\n• 纵向Override：踩油门/刹车（觉得系统太慢/太近/急刹）\n• 横向Override：转动方向盘（觉得系统偏了/犹豫/不安全）\n\n关键指标：\n• 接管率：override次数/总里程\n• 接管时长：驾驶员接管了多久才松手\n• 接管意图：为什么要接管\n  - 不舒适（急刹/蛇行）\n  - 不安全（太近/压线）\n  - 不信任（系统犹豫/决策慢）\n  - 想自己开（主动超车/赶路）\n\n数据采集：\n• Override时自动记录：场景快照、接管前后状态、传感器数据\n• 上传云端后分析系统不足\n• 驱动算法优化→减少同类Override\n\n与MPI的关系：\n• MPI = 总里程 / 接管次数\n• 安全MPI只统计安全相关接管\n• 效率MPI考虑通行效率因素",
    keyPoints: [
      "Override是用户对系统\"投的不信任票\"",
      "每次Override都是珍贵的数据样本",
      "Override意图分类比单纯计数更有价值",
      "减少Override = 提升MPI = 提升用户体验"
    ],
    relatedTerms: ["mpi", "hmi", "sr_display", "data_loop"],
  },
  {
    id: "hmi",
    name: "HMI",
    aliases: ["Human-Machine Interface", "人机交互界面", "人机交互"],
    category: "人机",
    difficulty: 1,
    summary: "智驾系统与驾驶员之间的信息交互界面，包含仪表盘/中控屏/HUD/方向盘/声音震动等多模态通道。",
    description: "HMI是智驾系统与驾驶员沟通的桥梁：\n\n显示通道：\n• 仪表盘：智驾状态图标、可用性、当前模式\n• 中控屏：详细设置、功能入口、SR显示\n• HUD：关键信息投影到挡风玻璃，减少视线偏离\n\n提醒通道：\n• 视觉：图标闪烁/弹窗/氛围灯\n• 听觉：警报音/语音播报\n• 触觉：座椅震动/方向盘振动\n\n接管提醒机制（L2/L3关键安全功能）：\n• 分级提醒：→一级(视觉)→二级(听觉)→三级(触觉)\n• L2：随时提醒，驾驶员需持续监控\n• L3：系统请求时提醒，驾驶员需在规定时间内接管\n\n设计原则：\n• 信息有效性：关键信息一目了然\n• 驾驶安全性：不过度分散注意力\n• 信任建立：透明的状态展示\n• 避免恐慌：渐进式提醒而非突然警报",
    keyPoints: [
      "HMI是智驾体验的\"门面\"",
      "多模态提醒比单一通道更可靠",
      "L2和L3的HMI设计逻辑完全不同",
      "HMI设计直接影响用户对智驾的信任度"
    ],
    relatedTerms: ["sr_display", "override"],
  },
  {
    id: "god",
    name: "GOD",
    aliases: ["General Obstacle Detection", "通用障碍物检测", "通用障碍物识别"],
    category: "感知",
    difficulty: 2,
    summary: "不预设障碍物类别，直接判断区域是否可通行的感知方法，是解决\"长尾场景\"的关键能力。",
    description: "GOD是当前智驾感知的重要方向：\n\n与传统检测的区别：\n• 传统检测：预设类别（车/行人/自行车/锥桶...）\n  - 只能识别训练过的类别\n  - 遇到未知物体（侧翻卡车/散落货物）可能漏检\n• GOD：不分类别，直接判断\"能不能走\"\n  - 不需要知道障碍物是什么\n  - 只要判断该区域是否可通行\n\n实现方法：\n• 占据网络（Occupancy Network）：体素级可通行性判断\n  - 特斯拉2022年提出，行业广泛跟进\n  - 将空间划分为小立方体(体素)\n  - 每个体素标注：占用/空闲/未知\n• 自由空间检测（Free Space）：像素级可行驶区域\n• 高度图（Height Map）：基于高度差判断障碍\n\n优势：\n• 无需穷举所有障碍物类别\n• 对未知/罕见物体有天然鲁棒性\n• 与Occupancy Network结合效果更好\n\n挑战：\n• 远距离精度不足\n• 透明/半透明物体（玻璃门）可能误判\n• 计算量较大（体素级处理）",
    keyPoints: [
      "GOD = \"不管是什么，能不能走\"的感知思路",
      "是解决长尾场景/Corner Case的关键能力",
      "Occupancy Network是当前最主流的GOD实现",
      "华为GOD网络是行业较早的量产实现"
    ],
    relatedTerms: ["occupancy", "bev", "e2e"],
    relatedBrands: ["huawei", "tesla", "xiaopeng"],
  },
  {
    id: "occupancy",
    name: "Occupancy Network",
    aliases: ["占据网络", "占据率网络", "Occupancy"],
    category: "感知",
    difficulty: 3,
    summary: "将3D空间划分为体素网格，预测每个体素的占用状态，实现对任意形状障碍物的通用检测。",
    description: "Occupancy Network是当前最前沿的感知架构之一：\n\n核心思想：\n• 将车辆周围3D空间划分为均匀的体素(Voxel)网格\n• 每个体素预测：占用/空闲/未知\n• 不需要知道占用体素是什么，只需要知道\"有东西\"\n\n与BEV的关系：\n• BEV是2D俯视图，Occupancy是3D体素图\n• Occupancy = BEV + 高度维度\n• 两者通常串联使用：BEV特征→3D Occupancy预测\n\n技术路线：\n• 纯视觉Occupancy：特斯拉首创，成本最低\n  - 多摄像头→BEV特征→3D体素预测\n  - 挑战：深度估计精度、遮挡推理\n• 激光雷达Occupancy：精度最高\n  - 点云天然包含3D信息，直接映射到体素\n• 多模态Occupancy：融合视觉+激光雷达\n\n关键参数：\n• 体素分辨率：0.1m-0.5m，越小越精细但计算量越大\n• 感知范围：通常100m×100m×5m\n• 推理速度：需>10Hz满足实时性\n\n应用场景：\n• 通用障碍物检测（GOD）\n• 异形障碍物识别（侧翻卡车/散落货物）\n• 窄道通行判断\n• 自动泊车空间感知",
    keyPoints: [
      "Occupancy = 3D版BEV，体素级环境理解",
      "不区分障碍物类别，只判断\"有没有东西\"",
      "是解决长尾感知问题的核心架构",
      "计算量大是量产落地的最大挑战"
    ],
    relatedTerms: ["bev", "god", "e2e"],
    relatedBrands: ["tesla", "huawei", "xiaopeng"],
    evolution: "2D语义分割→BEV语义→Occupancy 3D→4D Occupancy(时序)",
    controversy: "纯视觉Occupancy的深度精度是否足够支撑安全决策"
  },
  {
    id: "ros",
    name: "ROS",
    aliases: ["Robot Operating System", "机器人操作系统"],
    category: "开发",
    difficulty: 2,
    summary: "机器人软件开发的核心框架，提供分布式架构、丰富工具生态（RViz/Gazebo）和庞大社区，在智驾开发中广泛采用。",
    description: "ROS是自动驾驶开发的基础框架之一：\n\n核心概念：\n• Node（节点）：独立进程，完成特定功能\n• Topic（话题）：发布-订阅模式的异步通信\n• Service（服务）：请求-响应模式的同步通信\n• Action（动作）：长时间运行的任务+反馈\n\n主要优势：\n• 丰富的工具生态：RViz(3D可视化)、Gazebo(物理仿真)\n• 分布式架构：支持多机协同，低耦合\n• 庞大的社区：丰富的开源包和文档\n\nROS1 vs ROS2：\n• ROS1：单机为主，通信延迟不保证，不适合量产\n• ROS2：基于DDS，支持实时通信、QoS、安全认证\n  - 适合对实时性要求高的场景\n  - 支持多主机分布式部署\n\n在智驾中的应用：\n• 原型开发和快速验证\n• 传感器驱动和数据采集\n• 算法模块间的数据通信\n• 仿真和调试\n\n局限性：\n• 不适合直接用于量产（实时性/可靠性不足）\n• 量产系统通常使用自研中间件（如Cyber RT/自研通信框架）",
    keyPoints: [
      "ROS是开发利器但不是量产方案",
      "ROS2比ROS1更适合对实时性有要求的场景",
      "百度Apollo使用自研Cyber RT替代ROS",
      "MCAP是ROS2推荐的数据存储格式"
    ],
    relatedTerms: ["simulation", "mcap_format"],
  },
  {
    id: "mcap_format",
    name: "MCAP",
    aliases: ["Message Container Archive Packet", "消息容器格式"],
    category: "开发",
    difficulty: 2,
    summary: "路测数据的标准存储格式，开放的容器格式，可存储多通道时序数据（图像/点云/雷达等），支持索引和回放。",
    description: "MCAP是自动驾驶数据存储的标准格式：\n\n特点：\n• 开放格式，不绑定特定厂商\n• 支持多通道(多Topic)时序数据\n• 支持多种消息类型：图像、点云、CAN总线、GPS等\n• 支持索引，可快速定位和回放\n• 支持压缩，节省存储空间\n\n在数据闭环中的角色：\n1. 路测采集→以MCAP格式保存全部传感器数据\n2. 上传云端→MCAP格式便于传输和索引\n3. 回灌测试→MCAP回放驱动算法验证\n4. 标注分析→MCAP索引快速定位场景\n\n与ROS的关系：\n• MCAP是ROS2推荐的数据存储格式\n• 替代了ROS1的bag格式\n• 更好的索引和压缩性能\n\n为什么MCAP重要？\n• 统一的数据格式降低工具链集成成本\n• 支持大规模数据的快速检索\n• 便于跨团队/跨公司数据共享",
    keyPoints: [
      "MCAP = 智驾数据的\"ZIP格式\"",
      "ROS2推荐格式，替代ROS1的bag格式",
      "支持索引+压缩+多通道，适合大规模路测数据",
      "是数据闭环中采集→存储→回放的标准载体"
    ],
    relatedTerms: ["ros", "data_loop", "simulation"],
  },

  // ========== 补充评测术语 ==========
  {
    id: "mpi",
    name: "MPI",
    aliases: ["Miles Per Intervention", "每次接管里程", "接管里程"],
    category: "评测",
    difficulty: 2,
    summary: "总行驶里程除以接管次数，衡量智驾系统持续运行能力的核心指标，MPI越高说明系统越可靠。",
    description: "MPI是自动驾驶行业最常用的评价指标：\n\n计算方式：MPI = 总行驶里程 / 接管次数\n\n分类：\n• 安全MPI：仅统计安全相关接管\n  - 系统未能识别危险目标\n  - 系统响应不当需要纠正\n  - 直接关系行车安全\n• 效率MPI：考虑通行效率的接管评价\n  - 系统行驶过慢被接管\n  - 选道不当导致绕路\n  - 反映系统能力和效率的综合水平\n\n为什么MPI重要？\n• 是智驾系统可靠性的直观量化指标\n• 用户最关心的体验：\"多久需要接管一次\"\n• 不同厂商的MPI数据可横向对比\n• MPI趋势反映算法迭代效果\n\nMPI的问题：\n• 接管定义不统一（什么算接管？1秒还是5秒？）\n• 路况差异大（高速MPI远高于城区）\n• 自报数据缺乏第三方验证\n• 安全MPI和效率MPI需分开看\n\n加州DMV接管报告：\n• 全球最权威的MPI数据来源\n• 要求所有在加州测试的自动驾驶公司披露接管数据\n• 但仅覆盖测试车辆，不包含量产用户数据",
    keyPoints: [
      "MPI = 智驾可靠性的\"高考成绩\"",
      "安全MPI比效率MPI更有参考价值",
      "高速MPI和城区MPI不能直接比较",
      "自报MPI缺乏公信力，需第三方验证"
    ],
    relatedTerms: ["override", "mcp", "data_loop"],
    relatedBrands: ["tesla", "waymo"],
  },
  {
    id: "mcp",
    name: "MCP",
    aliases: ["Miles Per Intervention Coverage", "接管里程覆盖率"],
    category: "评测",
    difficulty: 2,
    summary: "接管事件发生的路段占总里程的比例，比MPI更细致地反映系统在不同路段的表现差异。",
    description: "MCP是MPI的补充指标，提供更细粒度的评价：\n\n计算方式：MCP = 发生接管的路段里程 / 总里程\n\n与MPI的区别：\n• MPI：关注\"多久接管一次\"（频率维度）\n• MCP：关注\"多少路段需要接管\"（覆盖维度）\n\nMCP的价值：\n• 识别系统能力的薄弱路段\n  - 如果MCP=30%，说明30%的路段有接管\n  - 这些路段是算法优化的优先目标\n• 比MPI更能反映系统的\"可用范围\"\n  - MPI可能被少数长路段的好表现拉高\n  - MCP直接告诉你\"多少路能放心开\"\n\n与通勤路线的关系：\n• 通勤路线的MCP是用户最关心的\n• 通勤MCP接近0% = 几乎不用接管 = 体验好\n• 通勤MCP > 20% = 每天都有接管 = 体验差\n\n典型数据：\n• 高速MCP：<5%（大部分高速已较成熟）\n• 城区MCP：20-50%（城区场景仍不成熟）\n• 通勤MCP：10-30%（因路线固定，通常低于城区平均）",
    keyPoints: [
      "MCP比MPI更能反映\"实际可用范围\"",
      "通勤路线MCP是用户体验的核心指标",
      "MCP+MPI组合使用才完整",
      "降低MCP = 扩大智驾安全运行区域"
    ],
    relatedTerms: ["mpi", "override", "commute_route"],
  },
  {
    id: "vru",
    name: "VRU",
    aliases: ["Vulnerable Road User", "弱势道路使用者"],
    category: "评测",
    difficulty: 1,
    summary: "无保护的道路使用者（行人/自行车骑行者等），行为随机目标小，是智驾安全评测的重点关注对象。",
    description: "VRU是智驾安全评价的核心关注群体：\n\n包含：\n• 行人：最典型的VRU\n• 自行车/电动车骑行者\n• 滑板车/轮椅使用者\n• 儿童（更小/更不可预测）\n\n为什么VRU是重点？\n• 无保护：没有车身保护，碰撞后果严重\n• 行为随机：可能突然横穿/折返/停顿\n• 目标小：检测难度高于车辆\n• 法规关注：EU-NCAP/C-NCAP对VRU保护有专项评价\n\nAEB-VRU测试：\n• CPNA（行人近端横穿）：成人从右侧横穿\n• CPNA（儿童近端横穿）：儿童从遮挡物后跑出\n• CPNA（夜间行人）：低光照条件\n• CBNA（自行车近端横穿）：自行车横穿\n\n智驾对VRU的挑战：\n• 远距离小目标检测难\n• 意图预测难（行人随时可能改变方向）\n• 遮挡场景（公交车前方行人）\n• 夜间/雨天检测性能下降",
    keyPoints: [
      "VRU安全是智驾评测的\"一票否决\"项",
      "AEB-VRU是NCAP评价的核心测试",
      "儿童+遮挡+夜间是最难的VRU场景",
      "保护VRU = 智驾系统的安全底线"
    ],
    relatedTerms: ["aeb", "ncap"],
  },
  {
    id: "ncap",
    name: "NCAP",
    aliases: ["New Car Assessment Program", "新车评价规程"],
    category: "评测",
    difficulty: 1,
    summary: "全球各地区的汽车安全评价标准，E-NCAP 2026/C-NCAP 2024已将AEB/VRU/LKA等智驾功能纳入评分。",
    description: "NCAP是推动智驾功能普及的重要法规推力：\n\n主要版本：\n• E-NCAP（欧洲）：最严格，2026版新增多项智驾测试\n• C-NCAP（中国）：2024版大幅加强AEB和VRU测试\n• NHTSA/IHS（美国）：侧重碰撞测试，智驾评价逐步跟进\n• J-NCAP（日本）/K-NCAP（韩国）/ASEAN NCAP\n\n智驾相关评分项：\n• AEB（自动紧急制动）：必测项\n  - AEB Car-to-Car：对前车自动制动\n  - AEB-VRU：对行人/自行车自动制动\n  - AEB Junction：路口交叉来车\n  - AEB Reverse：倒车自动制动\n• LKA（车道保持辅助）：必测项\n• Speed Assist：速度辅助系统\n• Driver Monitoring：驾驶员监控\n\n趋势：\n• 2025-2026年，E-NCAP要求AEB必须包含夜间/高速场景\n• C-NCAP 2024将AEB权重从5%提升到15%\n• 未来可能纳入NOA/城区智驾的评价",
    keyPoints: [
      "NCAP是智驾功能的\"法规推力\"——不达标就不让卖",
      "E-NCAP 2026对智驾要求最严格",
      "C-NCAP 2024大幅提高AEB权重",
      "NCAP推动AEB从\"选装\"变成\"标配\""
    ],
    relatedTerms: ["aeb", "vru", "lkp"],
    relatedBrands: ["tesla", "huawei", "byd"],
  },
  {
    id: "trigger_mechanism",
    name: "触发机制",
    aliases: ["Trigger", "功能触发", "策略触发"],
    category: "架构",
    difficulty: 2,
    summary: "智驾功能策略介入的条件判断逻辑，定义系统在什么场景下如何响应，包括功能激活/退出/接管条件。",
    description: "触发机制是智驾系统行为的核心控制逻辑：\n\n三大类触发：\n• 功能激活条件：何时开启智驾功能\n  - 车速范围（如60-130km/h开启NOA）\n  - 道路类型（高速/城区/泊车）\n  - 天气条件（雨雪可能限制开启）\n  - 传感器状态（激光雷达无遮挡）\n\n• 功能退出条件：何时关闭智驾功能\n  - 驾驶员接管（方向盘扭矩/油门刹车）\n  - 系统故障（传感器失效/算力不足）\n  - 超出ODD（离开设计运行域）\n  - 安全风险（TTC过小）\n\n• 接管提醒策略：何时提醒驾驶员\n  - 分级提醒（视觉→听觉→触觉）\n  - 倒计时提醒（L3：10秒内接管）\n  - 紧急停车（L3：驾驶员未响应）\n\n设计原则：\n• 宁可误触发，不可漏触发（安全优先）\n• 触发条件明确，用户可预期\n• 避免频繁进出导致体验割裂",
    keyPoints: [
      "触发机制定义了智驾系统的\"行为边界\"",
      "触发条件的设计直接影响用户体验和安全性",
      "频繁误触发=用户关闭功能=功能价值归零",
      "L2和L3的触发机制设计逻辑差异巨大"
    ],
    relatedTerms: ["odd", "hmi", "override"],
  },
  {
    id: "domain_controller",
    name: "域控制器",
    aliases: ["Domain Controller", "DCU", "智驾域控"],
    category: "架构",
    difficulty: 2,
    summary: "车载计算核心，集成感知/规划/控制等计算任务于单一高性能计算平台，是智能汽车的\"大脑\"。",
    description: "域控制器是智能汽车电子架构的核心：\n\n演进路径：\n• 分布式ECU：一个功能一个芯片，线束复杂\n• 域集中：按功能域整合（智驾域/座舱域/底盘域）\n• 中央计算：一个中央计算平台+区域控制器\n\n智驾域控制器的关键参数：\n• 算力（TOPS）：决定能跑多复杂的算法\n• 功耗（W）：影响散热和整车能耗\n• 接口：摄像头/激光雷达/以太网/CAN数量\n• 安全等级：ASIL-D要求双路冗余\n• 制程：7nm→5nm→4nm，影响算力功耗比\n\n主流方案：\n• NVIDIA Orin-X：254TOPS，当前最主流\n• NVIDIA Thor：2000TOPS，下一代\n• 华为MDC：580TOPS(L3)/2000TOPS(L4)\n• 地平线征程6P：560TOPS，性价比路线\n• 自研芯片：小鹏图灵(3000TOPS)/比亚迪璇玑(2100TOPS)\n\n选型考量：\n• 算力需求 vs 成本\n• 供应链安全 vs 技术领先\n• 自研 vs 外采的取舍",
    keyPoints: [
      "域控制器是智驾系统的\"大脑\"——算力是核心",
      "当前主流：Orin-X(254TOPS)→下一代：Thor(2000TOPS)",
      "自研芯片是大趋势：小鹏/比亚迪/特斯拉",
      "ASIL-D要求双路冗余——安全是底线"
    ],
    relatedTerms: ["orin", "thor", "asil"],
    relatedBrands: ["nvidia", "huawei", "horizon"],
  },
  {
    id: "whitelist",
    name: "白名单",
    aliases: ["Whitelist", "可信目标列表", "目标白名单"],
    category: "架构",
    difficulty: 2,
    summary: "经过验证的可信目标列表，用于障碍物识别，提高识别效率和准确性，减少误识别和漏识别。",
    description: "白名单是智驾感知系统的辅助机制：\n\n作用：\n• 提高识别效率：白名单内的目标优先处理\n• 减少误识别：已知可信目标不容易被误判\n• 辅助决策：白名单目标的跟踪和预测更稳定\n\n典型应用：\n• 红绿灯白名单：已知路口的信号灯位置和类型\n• 车道线白名单：高精地图中的车道信息\n• 静态障碍物白名单：路边固定的护栏/隔离墩\n\n白名单 vs 黑名单：\n• 白名单：已知可信→优先通过→效率高\n• 黑名单：已知危险→优先拒绝→安全高\n• 智驾两者结合使用\n\n局限性：\n• 白名单维护成本高\n• 新场景/新路需要更新白名单\n• 过度依赖白名单降低泛化能力\n• \"无图\"方案试图减少对白名单的依赖",
    keyPoints: [
      "白名单 = \"认识的目标更可靠\"的辅助策略",
      "红绿灯位置白名单是最典型的应用",
      "过度依赖白名单=过度依赖地图=泛化差",
      "\"去白名单化\"是端到端方案的思路之一"
    ],
    relatedTerms: ["hd_map", "god", "e2e"],
  },

  // ========== 决策/规划术语（来自学习笔记补充） ==========

  {
    id: "pnc",
    name: "规划与控制",
    aliases: ["PNC", "Planning and Control", "规划控制"],
    category: "决策",
    difficulty: 2,
    summary: "自动驾驶系统的\"大脑\"，负责生成行驶轨迹并控制车辆执行，是感知到行动的核心桥梁。",
    description: "PNC 是规划(Planning)与控制(Control)的合称，是自动驾驶最核心的软件模块之一：\n\n规划层：\n• 任务规划：全局路线规划（A→B走哪条路）\n• 行为规划：决定做什么动作（跟车/变道/超车/让行）\n• 轨迹规划：生成具体行驶轨迹（位置+速度+加速度随时间变化）\n\n控制层：\n• 横向控制：控制方向盘转角，保持车道、变道\n• 纵向控制：控制油门刹车，保持车距、加减速\n• 横纵耦合：复杂场景横向纵向协同控制\n\nPNC 的核心挑战：\n• 安全性约束：不碰撞、不出界\n• 运动学约束：车辆物理特性（转弯半径、加速度）\n• 实时性要求：毫秒级决策\n• 多目标优化：安全+效率+舒适同时满足",
    keyPoints: [
      "PNC = 规划(生成路径) + 控制(执行路径)",
      "三层规划：任务→行为→轨迹，从宏观到微观",
      "横向控制管方向，纵向控制管速度",
      "端到端方案试图用一个大模型替代传统PNC架构"
    ],
    relatedTerms: ["behavior_planning", "trajectory_planning", "motion_control", "mpc", "e2e"],
  },
  {
    id: "behavior_planning",
    name: "行为规划",
    aliases: ["Behavior Planning", "行为决策", "决策层"],
    category: "决策",
    difficulty: 2,
    summary: "决定车辆应该采取什么宏观行为（跟车/变道/超车/让行/停车），是决策链条的关键环节。",
    description: "行为规划是规划系统的中间层，连接任务规划和轨迹规划：\n\n输入：\n• 感知模块的环境信息（周围车辆、行人、交通标志）\n• 预测模块的未来轨迹估计\n• 当前道路拓扑和交通规则\n\n输出：\n• 宏观行为决策（跟车/变道/超车/让行/停车）\n• 行为切换时机（何时变道、何时超车）\n\n实现方法：\n• 有限状态机(FSM)：经典方法，状态清晰但扩展性差\n• 决策树：规则驱动，可解释性强\n• 基于学习的方法：强化学习/模仿学习，泛化好但可解释性差\n\n多目标权衡：\n• 安全性：不碰撞、不违章\n• 效率性：选最优车道、最短路径\n• 舒适性：避免急刹急转\n• 合法性：遵守交通规则",
    keyPoints: [
      "行为规划 = \"做什么\"，轨迹规划 = \"怎么做\"",
      "核心难点：多目标优化（安全/效率/舒适/合法）",
      "选道犹豫是最常见的体验问题",
      "端到端方案将行为规划隐式融合在模型中"
    ],
    relatedTerms: ["pnc", "trajectory_planning", "fsm", "rl"],
  },
  {
    id: "trajectory_planning",
    name: "轨迹规划",
    aliases: ["Trajectory Planning", "路径规划", "运动规划"],
    category: "决策",
    difficulty: 2,
    summary: "将行为决策转化为具体的行驶轨迹（位置+速度+加速度曲线），满足安全、运动学和动力学约束。",
    description: "轨迹规划是行为规划和运动控制之间的桥梁：\n\n任务：生成一条从当前位置到目标位置的安全可执行轨迹\n\n三重约束：\n• 安全性约束：不碰撞、不越界\n• 运动学约束：车辆物理特性（最小转弯半径、最大加速度）\n• 动力学约束：加速度、曲率变化率不能超过物理极限\n\n常用算法：\n• 基于采样：RRT、RRT*（快速探索随机树）\n• 基于搜索：A*、Hybrid A*（考虑车辆运动学）\n• 基于优化：数值优化、二次规划(QP)\n• 基于学习：神经网络直接输出轨迹\n\n实际工程中的考虑：\n• 计算频率：通常10-20Hz\n• 时间窗口：规划未来3-5秒\n• 平滑性：轨迹需要足够平滑，避免急转\n• 重规划：环境变化时需要快速重规划",
    keyPoints: [
      "轨迹 ≠ 路径：轨迹包含时间维度（速度曲线）",
      "Hybrid A* 是量产中最常用的搜索方法",
      "实时性要求10-20Hz规划频率",
      "端到端直接输出轨迹，跳过传统分层架构"
    ],
    relatedTerms: ["pnc", "behavior_planning", "motion_control", "mpc"],
  },
  {
    id: "motion_control",
    name: "运动控制",
    aliases: ["Motion Control", "车辆控制", "底层控制"],
    category: "控制",
    difficulty: 2,
    summary: "将规划轨迹转化为具体控制指令（方向盘转角/油门/刹车），直接与车辆执行器交互。",
    description: "运动控制是自动驾驶系统的最底层，直接与车辆硬件交互：\n\n输入：规划轨迹（目标位置、速度、加速度序列）\n输出：控制指令（方向盘转角、油门开度、刹车力度）\n\n常用控制方法：\n• PID控制：经典简单，但难以处理复杂非线性\n• MPC（模型预测控制）：考虑未来预测，处理约束最优\n• 自适应控制：适应不同路况和驾驶风格\n• 纯追踪(Pure Pursuit)：横向控制经典算法\n• Stanley方法：斯坦福无人车横向控制方法\n\n核心挑战：\n• 车辆动力学建模精度\n• 不同路面附着系数的适应\n• 执行器延迟和饱和\n• 低速和高速控制策略差异大\n\n横纵向控制：\n• 横向控制：方向盘→车辆朝向→车道保持/变道\n• 纵向控制：油门/刹车→车速→跟车/定速\n• 横纵耦合：弯道加减速时需要协调",
    keyPoints: [
      "运动控制 = PNC架构的\"执行层\"",
      "MCP是最常用的现代控制方法",
      "PID简单但不适应复杂场景",
      "执行器延迟(100-200ms)是重要约束"
    ],
    relatedTerms: ["pnc", "mpc", "trajectory_planning", "pid"],
  },
  {
    id: "pid",
    name: "PID控制",
    aliases: ["PID", "Proportional-Integral-Derivative", "比例-积分-微分控制"],
    category: "控制",
    difficulty: 1,
    summary: "最经典的反馈控制算法，通过比例、积分、微分三个环节消除误差，简单可靠但难以处理复杂非线性系统。",
    description: "PID是工业控制中应用最广泛的控制算法：\n\n三个环节：\n• P（比例）：误差越大，控制量越大 → 快速响应\n• I（积分）：累积历史误差消除稳态误差 → 精确\n• D（微分）：预测误差变化趋势 → 抑制超调\n\n在智驾中的应用：\n• 纵向控制：定速巡航/跟车时的油门刹车控制\n• 横向控制：车道保持时的方向盘控制\n• 泊车控制：低速精细控制\n\n优点：\n• 简单易懂，参数整定方便\n• 无需系统精确模型\n• 可靠性高\n\n缺点：\n• 难以处理强非线性系统\n• 无法显式处理约束（加速度限制等）\n• 参数固定，适应性差\n• 在复杂场景表现不如MPC",
    keyPoints: [
      "PID = 比例(快) + 积分(准) + 微分(稳)",
      "最简单可靠的控制器，但不是最优的",
      "量产车底层执行器仍大量使用PID",
      "复杂场景被MPC替代"
    ],
    relatedTerms: ["motion_control", "mpc"],
  },
  {
    id: "fsm",
    name: "有限状态机",
    aliases: ["FSM", "Finite State Machine", "状态机"],
    category: "决策",
    difficulty: 1,
    summary: "一种行为建模方法，将驾驶行为定义为有限个状态及状态间的转移条件，经典的行为规划实现方式。",
    description: "FSM是行为规划的经典实现方法：\n\n核心概念：\n• 状态(State)：跟车、变道、超车、让行、停车等\n• 转移(Transition)：状态之间的切换条件\n• 动作(Action)：每个状态下执行的操作\n\n示例：\n跟车 → [前车慢+左车道安全] → 变道\n变道 → [变道完成] → 跟车\n跟车 → [前车停止] → 停车\n\n优点：\n• 逻辑清晰、可解释性强\n• 调试方便，状态追踪容易\n• 安全性验证相对简单\n\n缺点：\n• 状态数爆炸：真实场景状态太多\n• 难以覆盖所有边界情况\n• 规则维护成本随复杂度指数增长\n• 无法处理规则未覆盖的新场景\n\n演进方向：\n• 层次状态机(HFSM)：分层管理复杂度\n• 混合自动机：结合连续动态\n• 端到端学习：用神经网络替代状态机",
    keyPoints: [
      "FSM = 有限状态 + 转移条件 + 动作",
      "最经典的行为规划方法，可解释性强",
      "状态数爆炸是主要问题",
      "端到端方案试图用数据驱动替代规则驱动"
    ],
    relatedTerms: ["behavior_planning", "pnc"],
  },
  {
    id: "mpc",
    name: "模型预测控制",
    aliases: ["MPC", "Model Predictive Control", "预测控制"],
    category: "控制",
    difficulty: 3,
    summary: "基于系统模型在未来有限时域内求解最优控制序列的方法，能显式处理约束，是现代智驾控制的主流方法。",
    description: "MPC是当前自动驾驶控制层最主流的高级控制方法：\n\n核心思想：\n1. 用系统模型预测未来状态\n2. 在有限预测时域内求解最优控制序列\n3. 只执行第一步控制\n4. 下一个时刻重新求解（滚动优化）\n\n三大要素：\n• 预测模型：描述系统动态行为\n• 滚动优化：每步重新求解最优控制\n• 反馈校正：用实际状态修正预测\n\n在智驾中的应用：\n• 轨迹跟踪：精确跟踪规划轨迹\n• 约束处理：显式处理加速度/转向角约束\n• 横纵协同：同时优化横向和纵向控制\n\nMPC vs PID：\n• MPC能处理约束，PID不能\n• MPC考虑未来预测，PID只看当前误差\n• MPC计算量大，PID计算量极小\n• MPC需要精确模型，PID不需要\n\nMPC vs 端到端：\n• MPC可解释、可验证，端到端不可解释\n• MPC依赖模型精度，端到端数据驱动\n• 量产中两者常结合：端到端决策+MPC控制",
    keyPoints: [
      "MPC = 预测+优化+反馈的滚动控制",
      "最大优势：能显式处理物理约束",
      "计算量大是量产落地的主要障碍",
      "端到端做决策，MPC做执行是常见组合"
    ],
    relatedTerms: ["motion_control", "pid", "pnc", "e2e"],
    evolution: "从线性MPC→非线性MPC→自适应MPC，端到端正在挑战MPC的地位但短期内不会被完全替代",
  },
  {
    id: "override",
    name: "驾驶员接管",
    aliases: ["Override", "接管", "人工接管"],
    category: "评测",
    difficulty: 2,
    summary: "驾驶员主动干预自动驾驶系统控制（踩油门/刹车/转方向盘），是衡量系统可靠性的核心指标。",
    description: "接管是自动驾驶评测最核心的指标之一：\n\n分类：\n• 纵向Override：驾驶员踩油门刹车\n• 横向Override：驾驶员转动方向盘（超过阈值）\n\n关键指标：\n• 接管率：override发生次数/总里程\n• 接管时长：驾驶员接管了多久\n• 接管意图：接管原因（不舒适/不信任/想自己开）\n\n数据采集：\nOverride时自动记录：\n• 场景上下文（道路类型/天气/交通状态）\n• 接管原因（用户标注或系统推断）\n• 接管前后系统状态\n• 接管前系统行为（是否异常）\n\n用途：\n• 分析系统不足→优化算法→减少误触发\n• 接管数据是数据闭环的核心输入\n• 高频接管场景优先优化\n\nMPI(每次接管里程) = 总里程/接管次数",
    keyPoints: [
      "Override = 人类不信任系统的信号",
      "纵向接管(刹车)比横向接管(转向)更安全敏感",
      "接管率是智驾体验最直观的指标",
      "通勤路线的接管率用户感知最强"
    ],
    relatedTerms: ["mpi", "disengagement", "data_loop"],
  },
  {
    id: "data_loop",
    name: "数据闭环",
    aliases: ["Data Loop", "数据飞轮", "数据闭环体系"],
    category: "开发",
    difficulty: 2,
    summary: "通过持续的数据采集→分析→优化→验证循环，驱动自动驾驶算法迭代提升的核心方法论。",
    description: "数据闭环是自动驾驶算法迭代的核心方法论：\n\n完整闭环流程：\n1. 外场实车采集路测数据（含高频通勤路线）\n2. 上传云端后完成数据清洗、标注分析\n3. 算法迭代优化\n4. 内场回灌、仿真工具回归测试\n5. 多源场景构建标准化评测数据集\n6. 内场验证合格后外场实车复测\n7. OTA远程升级下发至车辆\n8. 持续循环迭代\n\n核心价值：\n• 数据驱动的算法优化\n• 从用户真实场景中学习\n• 接管数据是最有价值的学习素材\n\n特斯拉的数据飞轮：\n• 200万+车队持续产生数据\n• 影子模式对比人类驾驶\n• 自动标注减少人力成本\n\n小鹏/理想等国内厂商：\n• 通勤路线高频场景优先优化\n• 用户接管数据自动回传\n• OTA 2-4周迭代一次",
    keyPoints: [
      "数据闭环 = 采集→分析→优化→验证→部署的循环",
      "接管数据是闭环最有价值的输入",
      "通勤路线是外场数据采集的主要来源",
      "特斯拉的\"数据飞轮\"是最经典的案例"
    ],
    relatedTerms: ["shadow_mode", "simulation", "ota", "override"],
  },
  {
    id: "god",
    name: "通用障碍物检测",
    aliases: ["GOD", "General Obstacle Detection", "通用障碍物识别"],
    category: "感知",
    difficulty: 2,
    summary: "不预设障碍物类别，直接判断该区域是否可通行的感知方法，是解决\"长尾场景\"的关键技术。",
    description: "GOD是华为ADS率先提出的感知思路：\n\n传统方法 vs GOD：\n• 传统：先分类（车/人/锥桶/...）→再判断是否避让\n  问题：未训练过的类别（侧翻卡车/散落货物）无法识别\n• GOD：不分类，直接判断该区域\"是否可通行\"\n  优势：任何障碍物都能检测，不依赖预定义类别\n\n实现方式：\n• 基于占据栅格(Occupancy Network)：将3D空间划分为网格，判断每个网格是否被占据\n• 基于深度估计：估计场景深度图，异常深度=障碍物\n\n与BEV的关系：\n• BEV提供鸟瞰视角的特征表达\n• GOD在BEV特征上构建占据栅格\n• 两者常结合使用\n\n局限：\n• 计算量大（3D体素表示）\n• 精度不如分类+检测的传统方法\n• 无法提供语义信息（不知道障碍物是什么）",
    keyPoints: [
      "GOD = \"不管是什么，挡路就避开\"",
      "解决了传统方法无法识别未知障碍物的问题",
      "占据栅格(Occupancy)是主要实现方式",
      "华为ADS最推崇的感知思路"
    ],
    relatedTerms: ["bev", "occupancy", "e2e"],
    relatedBrands: ["huawei"],
  },
  {
    id: "occupancy",
    name: "占据栅格网络",
    aliases: ["Occupancy Network", "Occupancy", "占据网络", "3D Occupancy"],
    category: "算法",
    difficulty: 3,
    summary: "将3D空间划分为体素网格并预测每个体素是否被占据的感知方法，是GOD通用障碍物检测的技术基础。",
    description: "Occupancy Network是特斯拉在AI Day 2022提出的技术：\n\n核心思想：\n• 将车辆周围的3D空间划分为立方体网格(体素Voxel)\n• 每个体素预测：被占据/空闲/未知\n• 不需要知道障碍物是什么，只需知道\"有没有东西\"\n\n技术细节：\n• 输入：多摄像头图像特征(BEV特征)\n• 输出：3D体素占据概率图\n• 分辨率：体素大小决定精度，通常10-20cm\n\n优势：\n• 通用性强：任何障碍物都能检测\n• 不依赖预定义类别\n• 适合处理异形障碍物\n\n劣势：\n• 计算量巨大（3D体素数量多）\n• 内存占用高\n• 精度与体素分辨率矛盾\n\n行业应用：\n• 特斯拉：率先提出并量产\n• 华为：GOD通用障碍物检测\n• 小鹏/理想：逐步跟进",
    keyPoints: [
      "Occupancy = 3D空间的\"是否有东西\"地图",
      "特斯拉AI Day 2022提出，行业快速跟进",
      "计算量大是量产落地的主要挑战",
      "GOD的思想基础"
    ],
    relatedTerms: ["god", "bev", "transformer"],
  },
  {
    id: "sr_display",
    name: "态势感知显示",
    aliases: ["SR", "Situation Recognition", "SR界面", "环境感知显示"],
    category: "人机",
    difficulty: 1,
    summary: "将传感器处理后的信息渲染到中控屏/仪表盘，让用户看到\"系统看到了什么\"，增强信任感。",
    description: "SR是智驾系统与驾驶员之间的\"可视化翻译\"：\n\n功能：\n• 实时显示周围车辆位置、速度、意图\n• 渲染道路结构（车道线/路口/匝道）\n• 显示交通信号灯状态\n• 标注天气状况和感知范围\n\n核心价值：\n• 增强用户信任：\"我看到系统看到了我\"\n• 接管决策依据：通过SR判断是否需要接管\n• 体验优化：好的SR让人安心，差的SR让人焦虑\n\n设计要点：\n• 实时性：延迟<100ms否则不信任\n• 准确性：显示与实际不一致会降低信任\n• 简洁性：过多信息反而干扰判断\n• 一致性：SR表现与系统行为一致\n\n各品牌SR差异：\n• 华为：SR渲染最丰富，车道/车辆/行人/信号灯全覆盖\n• 特斯拉：视觉化渲染，\"看到什么画什么\"\n• 小鹏：SR精度高，远处目标也能清晰显示",
    keyPoints: [
      "SR = \"让用户看到系统看到了什么\"",
      "好的SR = 增强信任，差的SR = 增加焦虑",
      "实时性和准确性是SR的生命线",
      "接管决策高度依赖SR显示质量"
    ],
    relatedTerms: ["hmi", "override"],
  },
  {
    id: "commute_route",
    name: "通勤路线",
    aliases: ["Commuting Route", "上下班路线", "高频通勤"],
    category: "评测",
    difficulty: 1,
    summary: "用户日常上下班的固定重复路线，路况稳定场景固定，是外场数据采集主要来源和用户感知最强的场景。",
    description: "通勤路线是智驾体验的核心场景：\n\n特点：\n• 路线固定、场景熟悉\n• 包含：跟车/路口/拥堵/普通变道等高频日常场景\n• 数据重复度高、样本量大\n• 极易形成数据闭环富集\n\n对用户的意义：\n• 直接影响日常体验：安全/效率/安心感/舒适感\n• 选道/变道/压线等问题最容易被感知\n• 通勤MPI是用户最关心的指标\n\n在内场外场中的作用：\n• 外场：通勤路线是量产车数据采集主力场景\n• 内场：优先基于通勤路线构建评测数据集\n• 迭代优先级：通勤高频场景优先优化\n\n极简版：用户日常固定上下班行驶的高频重复路线，路况稳定场景固定，是外场数据采集主要来源、内场评测数据集核心场景，优先迭代优化，直接决定日常智驾体验与接管指标。",
    keyPoints: [
      "通勤路线 = 最常用、最感知、最优先优化",
      "通勤MPI是用户最关心的指标",
      "数据重复度高=最容易形成数据飞轮",
      "优先迭代通勤场景是行业共识"
    ],
    relatedTerms: ["mpi", "override", "data_loop"],
  },
  {
    id: "inner_outer_field",
    name: "内场与外场",
    aliases: ["内场外场", "In-field/Out-field", "场内场外测试"],
    category: "开发",
    difficulty: 2,
    summary: "内场=实验室可控环境测试（仿真/回灌/HIL），外场=真实开放道路测试，二者配合驱动算法迭代。",
    description: "内场和外场是自动驾驶开发的两大测试体系：\n\n内场（实验室）：\n• 仿真测试：软件模拟各种驾驶场景\n• 回灌测试：将实际路测数据输入算法离线验证\n• 硬件在环(HIL)：仿真环境加入真实硬件闭环测试\n• 优势：场景可重复、风险可控、成本较低\n• 用途：大规模回归测试、边界条件验证\n\n外场（实车）：\n• 真实开放道路测试\n• 通勤路线数据采集\n• 用户接管数据收集\n• 优势：真实环境、发现仿真无法覆盖的问题\n\n迭代流程：\n外场发现问题→内场复现验证→算法优化→内场回归→外场复测→OTA下发\n\n关键指标：\n• 内场通过率→决定能否外场\n• 外场接管率→决定能否OTA\n• 通勤场景优先验证",
    keyPoints: [
      "内场 = 可控可重复，外场 = 真实不可控",
      "外场发现→内场复现→优化→回归→外场验证",
      "内场通过≠外场OK，仿真到实车有Sim2Real Gap",
      "通勤路线是连接内外场的核心场景"
    ],
    relatedTerms: ["simulation", "data_loop", "sil", "hil"],
  },
  {
    id: "long_tail",
    name: "长尾场景",
    aliases: ["Long Tail", "Corner Case", "极端场景", "边缘场景"],
    category: "评测",
    difficulty: 2,
    summary: "发生概率低但种类繁多的极端驾驶场景，是自动驾驶能力的天花板，也是数据闭环要解决的核心问题。",
    description: "长尾场景是自动驾驶最大的技术挑战：\n\n定义：\n• 发生概率低（<1%）但种类繁多（理论上无限）\n• 常规数据采集几乎无法覆盖\n• 每种场景样本量极少\n\n典型长尾场景：\n• 道路上突然出现的动物/散落货物\n• 交通事故现场/侧翻卡车\n• 异常施工区域/临时路障\n• 行人突然冲出/违规逆行\n• 恶劣天气（暴雪/冰雹/沙尘暴）\n\n为什么难：\n• 无法穷举：场景空间无限\n• 数据稀疏：每种场景训练样本不够\n• 规则失效：超出预设规则范围\n• 仿真困难：难以模拟所有变体\n\n解决思路：\n• 数据闭环：持续积累罕见场景数据\n• 仿真补充：主动构建长尾场景库\n• GOD/端到端：提高泛化能力\n• 影子模式：大规模车队收集Corner Case",
    keyPoints: [
      "长尾场景 = 无限种类 × 极低概率 = 最大挑战",
      "传统规则方案无法覆盖长尾",
      "端到端/GOD的泛化能力是应对长尾的希望",
      "数据闭环是积累长尾场景数据的唯一途径"
    ],
    relatedTerms: ["god", "data_loop", "shadow_mode", "simulation"],
  },
  {
    id: "v2x",
    name: "车联网通信",
    aliases: ["V2X", "Vehicle to Everything", "车路协同"],
    category: "通信",
    difficulty: 2,
    summary: "车辆与周围环境进行信息交换的技术（V2V/V2I/V2P/V2N），突破单车感知局限，实现超视距信息获取。",
    description: "V2X是实现智能网联汽车的关键使能技术：\n\n四大通信类型：\n• V2V（车与车）：交换位置/速度/方向，碰撞预警/协同换道\n• V2I（车与基础设施）：交换信号灯/路况，绿波通行\n• V2P（车与行人）：行人保护预警\n• V2N（车与网络）：实时路况/远程诊断\n\n通信标准：\n• C-V2X（蜂窝）：中国主推，基于5G/LTE\n• DSRC（专用短程）：美国早期主推，正在被C-V2X替代\n\n核心价值：\n• 超视距感知：提前知道看不到的信息\n• 协同决策：多车/车路协同优化\n• 安全冗余：传感器失效时的备选通道\n\n现状：\n• 基础设施建设成本高\n• 覆盖率不足\n• 标准仍在演进\n• 与单车智能互补而非替代",
    keyPoints: [
      "V2X = 车+车/路/人/网的信息交换",
      "核心价值：超视距感知+安全冗余",
      "C-V2X是中国主推标准",
      "与单车智能互补，不是替代关系"
    ],
    relatedTerms: ["gnss", "hd_map"],
  },
  {
    id: "lateral_longitudinal",
    name: "横纵向控制",
    aliases: ["横向控制", "纵向控制", "横纵耦合", "Lateral/Longitudinal Control"],
    category: "控制",
    difficulty: 1,
    summary: "横向控制管方向（方向盘/车道保持），纵向控制管速度（油门刹车/跟车），横纵耦合是复杂场景的难点。",
    description: "横纵向控制是车辆运动控制的两个基本维度：\n\n横向控制（Lateral）：\n• 控制方向盘转角\n• 功能：车道保持、变道、避障\n• 算法：Pure Pursuit、Stanley、MPC\n• 挑战：弯道精度、横风补偿\n\n纵向控制（Longitudinal）：\n• 控制油门和刹车\n• 功能：定速巡航、跟车、自动刹车\n• 算法：PID、MPC\n• 挑战：坡道起步、不同路面附着\n\n横纵耦合：\n• 弯道加减速：需要协调横向力和纵向力\n• 变道+加减速：同时变道和调速\n• 紧急避障：急转+急刹的极限工况\n• 低速泊车：频繁横纵切换\n\n智驾功能与横纵向对应：\n• ACC = 纵向控制\n• LKA/LCC = 横向控制\n• TJA/ICA = 横+纵\n• NOA = 横+纵+决策",
    keyPoints: [
      "横向=方向盘/方向，纵向=油门刹车/速度",
      "L2级=横+纵同时控制但人监控",
      "横纵耦合是复杂场景的核心难点",
      "NOA = 横纵向控制 + 路径决策"
    ],
    relatedTerms: ["motion_control", "pnc", "acc", "lka"],
  },
]

/** 根据ID查找术语 */
export function getTermById(id: string): TermEntry | undefined {
  return terms.find(t => t.id === id)
}

/** 根据名称/别名查找术语（模糊匹配） */
export function searchTerms(query: string): TermEntry[] {
  const q = query.toLowerCase()
  return terms.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.aliases.some(a => a.toLowerCase().includes(q)) ||
    t.summary.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q)
  )
}

/** 获取所有术语ID集合，用于文本标注 */
export const allTermIds = new Set(terms.map(t => t.id))

/** 根据品牌查找相关术语 */
export function getTermsByBrand(brandKey: string): TermEntry[] {
  return terms.filter(t => t.relatedBrands?.includes(brandKey))
}
