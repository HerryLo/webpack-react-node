/* 设备信息 */
export const devices = [
  {
    name: "htc",
    brand: "HTC",
    solutions: [
      {
        class_name: "com.android.settings.ManageApplications",
        package_name: "com.android.settings",
        title: "HTC 唤醒状态",
        operations: ["1.打开系统设置", "2.点击应用程序", "3.选择247", "4.点击权限", "5.允许保持唤醒状态"]
      }
    ]
  },
  {
    name: "xiaomi",
    brand: "小米",
    solutions: [
      {
        class_name:
          "com.miui.powerkeeper.ui.HiddenAppsContainerManagementActivity",
        package_name: "com.miui.powerkeeper",
        title: "MIUI 神隐模式",
        operations: [
          "1.打开系统设置",
          "2.选择电量和性能",
          "3.选择神隐模式",
          "4.选择应用设置",
          "5.选择247",
          "6.选择无限制"
        ]
      },
      {
        class_name: "com.miui.permcenter.autostart.AutoStartManagementActivity",
        package_name: "com.miui.securitycenter",
        title: "MIUI 自启动管理",
        operations: ["1.打开安全中心", "2.点击授权管理", "3.选择自启动管理", "4.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "huawei",
    brand: "华为",
    solutions: [
      {
        class_name:
          "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity",
        package_name: "com.huawei.systemmanager",
        title: "华为 自启动权限",
        operations: [
          "1.打开系统设置",
          "2.选择权限管理",
          "3.选择247",
          "4.选择应用权限",
          "5.选择设置单项权限",
          "6.打开应用自动启动开关"
        ]
      },
      {
        class_name: "com.huawei.systemmanager.optimize.process.ProtectActivity",
        package_name: "com.huawei.systemmanager",
        title: "华为 受保护的后台应用",
        operations: ["1.打开系统设置", "2.点击电池", "3.选择锁屏清理应用", "4.找到247，设置为不清理"]
      },
      {
        class_name: "",
        package_name: "",
        title: "华为 特殊机型说明",
        operations: ["1.如果您是P8、麦芒4", "2.请不要添加任何权限"]
      }
    ]
  },
  {
    name: "oppo",
    brand: "OPPO",
    solutions: [
      {
        class_name:
          "com.coloros.powermanager.fuelgaue.PowerConsumptionActivity",
        package_name: "com.coloros.oppoguardelf",
        title: "OPPO 耗电应用管理",
        operations: [
          "1.打开系统设置",
          "2.点击电池",
          "3.点击耗电保护",
          "4.找到247",
          "5.关闭后台冻结",
          "6.关闭检测到异常时自动优化"
        ]
      },
      {
        class_name:
          "com.coloros.safecenter.permission.startup.StartupAppListActivity",
        package_name: "com.coloros.safecenter",
        title: "OPPO 自启动管理",
        operations: ["1.打开手机管家", "2.点击权限隐私", "3.点击自启动管理", "4.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "meizu",
    brand: "魅族",
    solutions: [
      {
        class_name: "com.meizu.safe.permission.PermissionMainActivity",
        package_name: "com.meizu.safe",
        title: "魅族 自启动权限",
        operations: ["1.打开手机管家", "2.点击权限管理", "3.选择自启动管理", "4.找到247，打开右侧开关"]
      },
      {
        class_name: "com.meizu.safe.ramcleaner.RAMCleanerActivity",
        package_name: "com.meizu.safe",
        title: "魅族 手机加速白名单",
        operations: [
          "1.打开手机管家",
          "2.点击手机加速",
          "3.点击右上角设置",
          "4.点击手机加速白名单",
          "5.点击添加白名单",
          "6.找到247，并勾选"
        ]
      },
      {
        class_name: "com.meizu.safe.powerui.AppPowerManagerActivity",
        package_name: "com.meizu.safe",
        title: "魅族 待机耗电管理",
        operations: ["1.打开手机管家", "2.点击省电模式", "3.点击待机耗电管理", "4.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "oneplus",
    brand: "一加",
    solutions: [
      {
        class_name: "com.oneplus.security.autorun.AutorunMainActivity",
        package_name: "com.oneplus.security",
        title: "一加 自启动管理",
        operations: ["1.打开系统设置", "2.点击应用与权限", "3.选择自启动管理", "4.找到247，打开右侧开关"]
      },
      {
        class_name:
          "com.oneplus.security.cleanbackground.view.ManageBackgroundAppListActivity",
        package_name: "com.oneplus.security",
        title: "一加 锁屏运行权限",
        operations: ["1.打开系统设置", "2.点击应用与权限", "3.点击应用休眠管理", "4.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "samsung",
    brand: "三星",
    solutions: [
      {
        class_name: "",
        package_name: "",
        title: "三星智能管理自动运行",
        operations: ["1.打开智能管理器", "2.选择应用程序管理", "3.选择管理自动运行", "4.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "vivo",
    brand: "vivo",
    solutions: [
      {
        class_name: "com.iqoo.secure.MainGuideActivity",
        package_name: "com.iqoo.secure",
        title: "vivo 自启动管理",
        operations: [
          "1.打开系统设置",
          "2.点击更多设置",
          "3.点击权限管理",
          "4.将上方Tab切换为权限",
          "5.点击自启动管理",
          "6.找到247，打开右侧开关"
        ]
      },
      {
        class_name: "com.iqoo.secure.MainGuideActivity",
        package_name: "com.iqoo.secure",
        title: "vivo 手机清理白名单",
        operations: ["1.点击左键进入后台", "2.找到247", "3.下滑", "4.247右上角出现锁状图标"]
      },
      {
        class_name: "com.iqoo.secure.MainGuideActivity",
        package_name: "com.iqoo.secure",
        title: "vivo 省电管理",
        operations: ["1.打开系统设置", "2.点击电池", "3.点击后台高耗电", "4.找到247,打开右侧开关"]
      }
    ]
  },
  {
    name: "*",
    brand: "其他",
    solutions: [
      {
        class_name: "",
        package_name: "",
        title: "尝试打开247自启动",
        operations: ["1.打开系统设置", "2.选择开机自动启动", "3.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "letv",
    brand: "乐视",
    solutions: [
      {
        class_name: "com.letv.android.letvsafe.AutobootManageActivity",
        package_name: "com.letv.android.letvsafe",
        title: "乐视 自启动权限",
        operations: ["1.打开管家", "2.点击自启动管理", "3.找到247，打开右侧开关"]
      },
      {
        class_name: "com.letv.android.letvsafe.BackgroundAppManageActivity",
        package_name: "com.letv.android.letvsafe",
        title: "乐视 禁止自动清理",
        operations: ["1.打开管家", "2.点击省电管理", "3.点击应用保护", "4.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "smartisan",
    brand: "锤子",
    solutions: [
      {
        class_name: "com.smartisanos.security.RadioPermissions",
        package_name: "com.smartisanos.security",
        title: "锤子 自启动权限"
      }
    ],
    operations: ["1.打开安全中心", "2.选择应用程序权限管理", "3.点击第三方应用权限管理", "4.找到247，打开右侧开关"]
  },
  {
    name: "nubia",
    brand: "努比亚",
    solutions: [
      {
        class_name: "",
        package_name: "",
        title: "nubia自启动管理",
        operations: ["1.打开牛盾", "2.点击授权管理", "3.点击自启动管理", "4.找到247，打开右侧开关"]
      }
    ]
  },
  {
    name: "honor",
    brand: "华为",
    solutions: [
      {
        class_name:
          "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity",
        package_name: "com.huawei.systemmanager",
        title: "华为 自启动权限",
        operations: [
          "1.打开系统设置",
          "2.选择权限管理",
          "3.选择247",
          "4.选择应用权限",
          "5.选择设置单项权限",
          "6.打开应用自动启动开关"
        ]
      },
      {
        class_name: "com.huawei.systemmanager.optimize.process.ProtectActivity",
        package_name: "com.huawei.systemmanager",
        title: "华为 受保护的后台应用",
        operations: ["1.打开系统设置", "2.点击电池", "3.选择锁屏清理应用", "4.找到247，设置为不清理"]
      },
      {
        class_name: "",
        package_name: "",
        title: "华为 特殊机型说明",
        operations: ["1.如果您是P8、麦芒4", "2.请不要添加任何权限"]
      }
    ]
  }
];
