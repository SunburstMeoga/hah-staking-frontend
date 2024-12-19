const zh = {
    home: {
        zh: '繁體中文',
        en: 'English',
        copyBtn: '復製',
        nodeList: '節點清單',
        totalNode: '共 {count} 個節點',
        votedNode: '已投 {count} 個節點',
        totalAmount: '總金額：',
        votedCount: '已投節點'
    },
    details: {
        pageTitle: '節點詳情',
        name: '節點名稱：',
        address: '節點地址：',
        point: '百分比：',
        apy: 'APY：',
        rank: '節點排名：',
        ordinaryVote: '普通已投：',
        returnsVote: '復利已投：',
        time: '節點上線時間：',
        compoundInterest: '復利：',
        ordinary: '普通：',
        amountInvested: '已投金額：',
        amount: '金額',
        voteBtn: '投票',
        redeemBtn: '撤投',
        canUse: '可用：',
        locked: '鎖定餘額：',
        currentValue: '當前值:',
        ordinaryLocked: '普通投票鎖定金額：',
        redeemLocked: '復利投票鎖定金額：',
        voteHeight: '投票高度',
        voteType: '投票類型',
        voteCycle: '投票周期',
        voteNonce: '投票隨機數',
        unLockHeight: '解鎖高度',
        voteAddress: '投票地址',
        pledgeReqRedeem: '取消投票',
        yield: '收益率',
        oneYear: '一年',
        half: '半年',
        trimester: '三個月',
        oneMonth: '一個月',
        oneWeek: '一周',
        operating: '操作'
    },
    wallet: {
        address: '錢包地址',
        name: '錢包名稱',
        balance: '餘額',
        votedAmount: '已投票數',
        earnings: '收益',
        totalVotes: '總投票數',
        totalRevenue: '總收益',
        canVotes: '可投票數',
        ordinaryEarnings: '普通收益',
        indexReturns: '復利收益',
        ordinaryVote: '普通投票',
        returnsVote: '復利投票',
        notVotes: '暫無投票',
        notEarning: '暫無收益'
    },
    table: {
        name: '節點名稱',
        address: '節點地址',
        votes: '投票量',
        apy: 'APY',
        nodeRank: '節點排名',
        point: '百分比',
        updatatime: '更新時間'
    },
    rules: {
        title: '投票規則',
        rulesOneTitle: '投票方法：',
        rulesTwoTitle: '普通與復利區別：',
        rulesThreeTitle: '撤投方法：',
        rulesFourTitle: '撤投限制規則：',
        rulesFiveTitle: '收益周期：',
        rulesSixTitle: '重投獎勵鎖定：',
        rulesSevenTitle: '最小有效投票量：',
        rulesOne: '點擊要投票的節點，進入節點詳情,選擇普通或者復利，填寫投票金額(不高於當前地址餘額), 點擊投票按鈕，即可完成投票。',
        rulesTwo: '普通表示收益發放到當前地址下，復利表示收益發放到投票地址下(撤投後才能自由轉賬)。',
        rulesThree: '點擊要撤投的節點，進入節點詳情,選擇普通或者復利，填寫撤投金額(不高於當前投票餘額), 點擊撤投按鈕，即可完成撤投。',
        rulesFour: '正式鏈需投票3天後才可撤投.測試鏈需投票6分鐘後才可撤投。',
        rulesFive: '測試鏈2分鐘，正式鏈1天。',
        rulesSix: '生產區塊或投票獲得的獎勵會被鎖定，每天發放一次獎勵，每天的獎勵都會分成180天釋放，即每天的獎勵都會分成180份，每天釋放一份。'
    },
    topBar: {
        connect: '連接錢包',
        disconnect: '斷開連接'
    },
    placeholder: {
        inputAmount: '請輸入金額',
    },
    toast: {
        copySuccess: '復製成功',
        copyFail: '復製失敗，請重新復製',
        linkWallet: '請先連接錢包',
        notAmount: '請輸入金額',
        notBalance: '餘額不足',
        voteSuccess: '投票成功',
        voteFail: '投票失敗',
        redeemSuccess: '撤投成功',
        redeemFail: '撤投失敗',
        amountExceededing: '撤投金額不能大於你已投票的金額'
    },
    dialog: {
        checkNetwork: '檢查您的網絡',
        checkMessage: '目前此頁面僅在HAH中受支持，如果切換網絡失敗，請手動切換網絡',
        confirmButtonText: '在“錢包”中切換網絡'
    },
    footBar: {
        title: '由Hash Ahead提供支持',
        company: '公司',
        aboutUs: '關於我們',
        Product: '產品與服務',
        vote: 'HAH投票系統',
        faucet: 'HAH水龍頭',
        browser: 'HAH瀏覽器',
    },
    Index: {
        h2: '區塊鏈瀏覽器是全球範圍內數據最精準，速度最快速的瀏覽器，用戶可以使用區塊鏈瀏覽器搭建錢包以及使用查詢和搜索鏈上的所有區塊鏈數據信息。',
    },
    loadStatus: {
        loading: '正在加載...',
        notData: '無數據',
        error: '網絡錯誤，請點擊此處重載'
    },
    tips: {
        amount: '*所有金額僅供參考，僅保留4位小數，實際金額以瀏覽器為準'
    }
}

export default zh