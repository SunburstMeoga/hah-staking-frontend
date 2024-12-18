const zh = {
    home: {
        zh: '中文',
        en: 'English',
        copyBtn: '复制',
        nodeList: '节点列表',
        totalNode: '共 {count} 个节点',
        votedNode: '已投 {count} 个节点',
        totalAmount: '总金额：',
        votedCount: '已投节点'
    },
    details: {
        pageTitle: '节点详情',
        name: '节点名称：',
        address: '节点地址：',
        point: '百分比：',
        apy: 'APY：',
        rank: '节点排名：',
        ordinaryVote: '普通已投：',
        returnsVote: '复利已投：',
        time: '节点上线时间：',
        compoundInterest: '复利：',
        ordinary: '普通：',
        amountInvested: '已投金额：',
        amount: '金额',
        voteBtn: '投票',
        redeemBtn: '撤投',
        canUse: '可用：',
        locked: '锁定余额：',
        currentValue: '当前值:',
        ordinaryLocked: '普通投票锁定金额：',
        redeemLocked: '复利投票锁定金额：',
        voteHeight: '投票高度',
        voteType: '投票类型',
        voteCycle: '投票周期',
        voteNonce: '投票随机数',
        unLockHeight: '解锁高度',
        voteAddress: '投票地址',
        pledgeReqRedeem: '取消投票',
        yield: '收益率',
        oneYear: '一年',
        half: '半年',
        trimester: '三个月',
        oneMonth: '一个月',
        oneWeek: '一周',
        operating: '操作'
    },
    wallet: {
        address: '钱包地址',
        name: '钱包名称',
        balance: '余额',
        votedAmount: '已投票数',
        earnings: '收益',
        totalVotes: '总投票数',
        totalRevenue: '总收益',
        canVotes: '可投票数',
        ordinaryEarnings: '普通收益',
        indexReturns: '复利收益',
        ordinaryVote: '普通投票',
        returnsVote: '复利投票',
        notVotes: '暂无投票',
        notEarning: '暂无收益'
    },
    table: {
        name: '节点名称',
        address: '节点地址',
        votes: '投票量',
        apy: 'APY',
        nodeRank: '节点排名',
        point: '百分比',
        updatatime: '更新时间'
    },
    rules: {
        title: '投票规则',
        rulesOneTitle: '投票方法：',
        rulesTwoTitle: '普通与复利区别：',
        rulesThreeTitle: '撤投方法：',
        rulesFourTitle: '撤投限制规则：',
        rulesFiveTitle: '收益周期：',
        rulesSixTitle: '重投奖励锁定：',
        rulesSevenTitle: '最小有效投票量：',
        rulesOne: '点击要投票的节点，进入节点详情,选择普通或者复利，填写投票金额(不高于当前地址余额), 点击投票按钮，即可完成投票。',
        rulesTwo: '普通表示收益发放到当前地址下，复利表示收益发放到投票地址下(撤投后才能自由转账)。',
        rulesThree: '点击要撤投的节点，进入节点详情,选择普通或者复利，填写撤投金额(不高于当前投票余额), 点击撤投按钮，即可完成撤投。',
        rulesFour: '正式链需投票3天后才可撤投.测试链需投票6分钟后才可撤投。',
        rulesFive: '测试链2分钟，正式链1天。',
        rulesSix: '生产区块或投票获得的奖励会被锁定，每天发放一次奖励，每天的奖励都会分成180天释放，即每天的奖励都会分成180份，每天释放一份。'
    },
    topBar: {
        connect: '连接钱包',
        disconnect: '断开连接'
    },
    placeholder: {
        inputAmount: '请输入金额',
    },
    toast: {
        copySuccess: '复制成功',
        copyFail: '复制失败，请重新复制',
        linkWallet: '请先链接钱包',
        notAmount: '请输入金额',
        notBalance: '余额不足',
        voteSuccess: '投票成功',
        voteFail: '投票失败',
        redeemSuccess: '撤投成功',
        redeemFail: '撤投失败',
        amountExceededing: '撤投金额不能大于你已投票的金额'
    },
    dialog: {
        checkNetwork: '检查您的网络',
        checkMessage: '目前此页面仅在HAH中受支持，如果切换网络失败，请手动切换网络',
        confirmButtonText: '在“钱包”中切换网络'
    },
    footBar: {
        title: '由Hash Ahead提供支持',
        company: '公司',
        aboutUs: '关于我们',
        Product: '产品与服务',
        vote: 'HAH投票系统',
        faucet: 'HAH水龙头',
        browser: 'HAH浏览器',
    },
    Index: {
        h2: '区块链浏览器是全球范围内数据最精准，速度最快速的浏览器，用户可以使用区块链浏览器搭建钱包以及使用查询和搜索链上的所有区块链数据信息。',
    },
    loadStatus: {
        loading: '正在加载...',
        notData: '无数据',
        error: '网络错误，请点击此处重载'
    },
    tips: {
        amount: '*所有金额仅供参考，仅保留4位小数，实际金额以浏览器为准'
    }
}

export default zh