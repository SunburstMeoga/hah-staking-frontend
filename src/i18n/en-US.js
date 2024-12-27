const en = {
    home: {
        zh: '中文',
        en: 'English',
        walletAddress: 'Wallet Address',
        copyBtn: 'Copy',
        nodeList: 'Node List',
        totalNode: 'Total of {count} Nodes',
        votedNode: '{count} Nodes have been voted',
        totalAmount: 'Total Amount:',
        votedCount: 'Cast nodes'
    },
    details: {
        pageTitle: 'Node Details',
        name: 'Node Name:',
        address: 'Node Address:',
        point: 'Percentage:',
        apy: 'APY:',
        rank: 'Rank:',
        ordinaryVote: 'Ordinary Votes:',
        returnsVote: 'Return Votes:',
        time: 'Node Update time:',
        compoundInterest: 'Compound Interest:',
        ordinary: 'Ordinary:',
        amountInvested: 'Amount Invested:',
        amount: 'Amount:',
        voteBtn: 'Vote',
        redeemBtn: 'Redeem',
        canUse: 'Available:',
        locked: 'Lock Amount:',
        currentValue: 'Current Value:',
        ordinaryLocked: 'Oridinary Locked:',
        redeemLocked: 'Redeem Locked:',
        voteHeight: 'Vote Height',
        voteType: 'Voting Type',
        voteCycle: 'Voting Cycle',
        voteNonce: 'Voting Random',
        unLockHeight: 'Voting Height',
        voteAddress: 'Voting Address',
        pledgeReqRedeem: 'Cancel Voting',
        yield: 'Yield',
        oneYear: 'One Year',
        half: 'Half a year',
        trimester: 'Three months',
        oneMonth: 'One Month',
        oneWeek: 'One Week',
        operating: 'Operation'

    },
    wallet: {
        address: 'Wallet Address',
        name: 'Wallet Name',
        balance: 'Balance',
        votedAmount: 'Number of votes voted',
        earnings: 'Earnings',
        totalVotes: 'Total Votes',
        totalRevenue: 'Total Revenue',
        canVotes: 'Number of Votes',
        ordinaryEarnings: 'Ordinary',
        indexReturns: 'Index Returns',
        ordinaryVote: 'Ordinary Votes',
        returnsVote: 'Return Votes',
        notVotes: 'No vote',
        notEarning: 'No Earning'
    },
    table: {
        name: 'Node Name',
        address: 'Node Address',
        votes: 'Votes',
        apy: 'APY',
        nodeRank: 'Node Rank',
        point: 'Percentage',
        updatatime: 'Update Time'
    },
    rules: {
        title: 'Voting Rules',
        rulesOneTitle: 'Voting method:',
        rulesTwoTitle: 'The difference between ordinary and compound interest:',
        rulesThreeTitle: 'Withdrawal method:',
        rulesFourTitle: 'Withdrawal restriction rule:',
        rulesFiveTitle: 'Earnings cycle:',
        rulesSixTitle: 'Re-Vote Reward Lock:',
        rulesSevenTitle: 'Minimum valid vote: ',
        rulesOne: 'Click the node to vote, enter the node details, select ordinary or compound interest, fill in the voting amount (not higher than the current address balance), click the voting button, you can complete the vote.',
        rulesTwo: 'Ordinary means that the income is distributed to the current address, and compound interest means that the income is distributed to the voting address (free transfer can be made after the withdrawal of investment). ',
        rulesThree: 'Click the node to be withdrawn, enter the node details, select ordinary or compound interest, fill in the withdrawal amount (not higher than the current voting balance), click the withdrawal button, you can complete the withdrawal. ',
        rulesFour: 'Official chains must vote 3 days before they can withdraw their votes. The test chain requires 6 minutes of voting before it can be withdrawn. ',
        rulesFive: '2 minutes for the test chain, 1 day for the official chain. ',
        rulesSix: "The rewards obtained by producing blocks or voting are locked, and the rewards are issued once a day, and the daily rewards are released in 180 days, that is, each day's reward is divided into 180 parts, and one is released every day."
    },
    topBar: {
        connect: 'Connect',
        disconnect: 'Disconnect'
    },
    placeholder: {
        inputAmount: 'Please enter amount',
    },
    toast: {
        copySuccess: 'Copy Successful',
        copyFail: 'Copy failed, please recopy',
        linkWallet: 'Please link wallet first',
        notAmount: 'Please enter amount',
        notBalance: 'Insufficient balance',
        voteSuccess: 'Vote Successful',
        voteFail: 'Vote failed',
        redeemSuccess: 'Withdrawal successful',
        redeemFail: 'Withdrawal failed',
        amountExceededing: 'The withdrawal amount cannot be greater than the amount you have voted'
    },
    dialog: {
        checkNetwork: 'Check your network',
        checkMessage: 'Currently this page is only supported in HAH,If switching networks fails, switch networks manually',
        confirmButtonText: 'Switch networks'
    },
    footBar: {
        title: 'Powered by Hash Ahead',
        company: 'Company',
        aboutUs: 'About Us',
        Product: 'Pruduct & Services',
        vote: 'HAH Vote',
        faucet: 'HAH Faucet',
        browser: 'HAH Browser',
    },
    Index: {
        h2: 'Blockchain browser is the most accurate and fast data browser in the world. Users can use the blockchain browser to build wallets and query and search all blockchain data information on the chain ',
    },
    loadStatus: {
        loading: 'Loading...',
        notData: 'No data',
        error: 'Network error, click here to reload'
    },
    tips: {
        amount: '*All amounts are for reference only, only 4 decimal places are reserved, the actual amount is subject to the browser'
    },
    newWord: {
        total: 'Total Votes Cast',
        reInvesting: 'Re-investing in Progress',
        stopInves: 'Stopping Re-investment',
        redeemed: 'Redeemed',
        votesCount: 'Node Votes Count',
        targetNodeVote: 'Votes for This Node',
        ruleTitle: 'Rule Description',
        toCross: 'Insufficient Balance, Please Go to Cross-chain Bridge',
        cancelBtn: 'Cancel',
        confirmBtn: 'Confirm',
        confirmChangeChainOne: 'Switch to',
        confirmChangeChainTwo: 'Exit HAH',
        success: 'Success!',
        from: 'From ',
        to: 'To ',
        cross: 'Cross-chain',
        receive: 'Received',
        crossBridge: 'Cross-chain Bridge',
        confirmCross: 'Confirm Cross-chain'
    }
}

export default en