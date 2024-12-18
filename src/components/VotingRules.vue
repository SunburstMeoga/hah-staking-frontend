<template>
    <div class="text-#A5A5A5 text-sm">
        <div>
            <div class="text-base text-white">最小投票量：</div>
            每次投票至少为100 HAH，少于100 HAH的投票将会被驳回。
        </div>
        <br />
        <div>
            <div class="text-base text-white">投票规则：</div>
            1、投票时可以自由选择不同周期的投票，周期分为7天、30天、90天、180天、365天。<br />
            2、在本金和奖励赎回前，同节点不同周期的投票最多只存在一张票据。<br />
            3、当投票票据的投票状态处于”复投进行中“时，可选择追加投票。<br />
            4、当投票票据的投票状态处于”停止复投中“时，无法追加投票。<br />
            5、在投票赎回前，同节点最多存在5张投票票据。<br />
        </div>
        <br />
        <div>
            <div class="text-base text-white">初始自动复投规则：</div>
            1、投票后，投票奖励将默认转入节点地址进行复投，奖励复投后，将会累计至投票量中计算投票奖励。<br />
            2、点击”停止复投“按钮并完成停止复投请求，票据的投票状态将会变更为”停止复投中“，该状态不可撤销。<br />
            3、当票据的投票状态处于”停止复投中“时，本金和停止之前的复投金额仍会计算投票奖励，但投票奖励将不再复投，每天结算并自动发放至用户地址。<br />
            4、追加投票将自动与当前投票金额合并，并按照最新投票量重新计算奖励。<br />
        </div>
        <br />
        <div>
            <div class="text-base text-white">赎回规则：</div>
            1、点击”停止复投“按钮，并完成停止复投请求后，将会根据用户选择的周期，计算结束投票的时间。<br />
            2、投票结束后，用户投票的本金和复投的投票奖励，将会直接发放至用户地址。<br />
            3、投票结束后，用户地址将赠送24小时负利率时间值，即24小时内转移赎回币不产生负利率费用。<br />
        </div>

        <!-- <br />
        <div>
            <div class="text-base text-white">{{ $t('rules.rulesFourTitle') }}</div>{{ $t('rules.rulesFour') }}
        </div>
        <br />
        <div>
            <div class="text-base text-white">{{ $t('rules.rulesFiveTitle') }}</div>{{ $t('rules.rulesFive') }}
        </div>
        <br />

        <div>
            <div class="text-base text-white">{{ $t('rules.rulesSixTitle') }}</div>{{ $t('rules.rulesSix') }}
        </div>
        <br />

        <div>
            <div class="text-base text-white">{{ $t('rules.rulesSevenTitle') }}</div>100 HAH
        </div> -->

    </div>
</template>

<script>
export default {

}
</script>

<style></style>