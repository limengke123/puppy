import Time from '../utils/time'
export default {
  headerItem: {
    title: '',
    left: '',
    right: '',
  },
  footerItem: [
    {
      name: '记账簿',
      path: '/',
      iconName: 'cash-back-record',
      id: 0
    },
    {
      name: '笔记',
      path: '/note',
      iconName: 'records',
      id: 1
    },
    {
      name: '关于',
      path: '/about',
      iconName: 'home',
      id: 2
    },
  ],
  moneyClasses: [
    {
      name: '食物',
      iconName: 'food',
      isActive: true,
      color: 'rgb(245,147,150)',
      id: 0,
      defaults: [
        '早餐',
        '午餐',
        '晚餐',
        '水果',
        '下午茶',
        '宵夜',
        '零食',
        '其他',
      ]
    },
    {
      name: '饮品',
      iconName: 'drink',
      isActive: false,
      color: 'rgb(134,195,188)',
      id: 1,
      defaults: [
        '咖啡',
        '水',
        '奶茶',
        '红茶',
        '牛奶',
        '绿茶',
        '其他',
      ]
    },
    {
      name: '交通',
      iconName: 'traffic',
      isActive: false,
      color: 'rgb(88,194,253)',
      id: 2,
      defaults: [
        '公交车',
        '地铁',
        '计程车',
        '火车',
        '高铁',
        '停车费',
        '加油',
      ]
    },
    {
      name: '购物',
      iconName: 'shop',
      isActive: false,
      color: 'rgb(193,136,178)',
      id: 3,
      defaults: [
        '衣服',
        '鞋子',
        '化妆品',
        '包包',
        '其他',
      ]
    },
    {
      name: '娱乐',
      iconName: 'entertainment',
      isActive: false,
      color: 'rgb(254,169,55)',
      id: 4,
      defaults: [
        '电影',
        'KTV',
        '运动',
        '小说',
        '电玩',
        '展览',
        '其他',
      ]
    },
    {
      name: '居家',
      iconName: 'house',
      isActive: false,
      color: 'rgb(177,199,32)',
      id: 5,
      defaults: [
        '房租',
        '电费',
        '水费',
        '日用品',
        '学习费用',
        '其他',
      ]
    },
    {
      name: '3c',
      iconName: 'phone',
      isActive: false,
      color: 'rgb(105,158,234)',
      id: 6,
      defaults: [
        '话费',
        '手机',
        '电脑',
        '键盘',
        '耳机',
        '其他',
      ]
    },
    {
      name: '医药',
      iconName: 'hospital',
      isActive: false,
      color: 'rgb(234,50,41)',
      id: 7,
      defaults: [
        '感冒',
        '牙医',
        '维生素',
        '保健食品',
        '其他',
      ]
    },
    {
      name: '其他',
      iconName: 'other',
      isActive: false,
      color: 'rgb(168,168,168)',
      id: 8,
      defaults: [
        '影印费',
        '红包',
        '报纸',
        '宠物用品',
        '文具',
        '其他',
      ]
    },
    {
      name: '收入',
      iconName: 'income',
      isActive: false,
      color: 'rgb(235,185,36)',
      id: 9,
      defaults: [
        '薪资',
        '生活费',
        '零用钱',
        '红包',
        '奖金',
        '消费反馈',
        '其他',
      ]
    },
  ],
  isAddModelShow: false,
  moneyList: JSON.parse(localStorage.getItem('moneyList')) || [],
  range: '',
  // 切换日期后显示的日期
  titleDate: new Time(new Date()).getDateString(),
  datePickerShow: false,
}
