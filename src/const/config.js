import abi from './abi.json'
import cross_abi from './cross_abi.json'

// 从环境变量获取链配置
const mainnetChainId = process.env.VUE_APP_MAINNET_CHAIN_ID
const mainnetRpcUrl = process.env.VUE_APP_MAINNET_RPC_URL
const mainnetChainName = process.env.VUE_APP_MAINNET_CHAIN_NAME
const mainnetExplorerUrl = process.env.VUE_APP_MAINNET_EXPLORER_URL

const subchainChainId = process.env.VUE_APP_SUBCHAIN_CHAIN_ID
const subchainRpcUrl = process.env.VUE_APP_SUBCHAIN_RPC_URL
const subchainChainName = process.env.VUE_APP_SUBCHAIN_CHAIN_NAME
const subchainExplorerUrl = process.env.VUE_APP_SUBCHAIN_EXPLORER_URL

const config = {
    erc20_abi: abi,
    cross_abi: cross_abi,
    con_addr: '0x00000000000000000000000000000000000000A1',
    unit: 'Gwei',
    amount: '10',

    // 默认使用主链配置
    chainId: mainnetChainId,
    chainName: mainnetChainName,
    rpcUrls: mainnetRpcUrl,
    blockExplorerUrls: mainnetExplorerUrl,

    // 主链配置信息，用于添加链到MetaMask
    chainConfig: {
        chainId: mainnetChainId,
        chainName: mainnetChainName,
        rpcUrls: [mainnetRpcUrl],
        nativeCurrency: {
            name: 'HAH',
            symbol: 'HAH',
            decimals: 18
        },
        blockExplorerUrls: [mainnetExplorerUrl],
        iconUrls: ['https://testnet.hashahead.org/logo.png']
    },

    // 子链配置
    subchainConfig: {
        chainId: subchainChainId,
        chainName: subchainChainName,
        rpcUrls: [subchainRpcUrl],
        nativeCurrency: {
            name: 'HAH',
            symbol: 'HAH',
            decimals: 18
        },
        blockExplorerUrls: [subchainExplorerUrl],
        iconUrls: ['https://testnet.hashahead.org/logo.png']
    },

    // 测试链配置（如果需要）
    testnetChainConfig: {
        chainId: '0x11623', // 71203 in decimal
        chainName: 'Hash Ahead Testnet',
        rpcUrls: ['https://rpc-testnet.hashahead.org/mrpc'],
        nativeCurrency: {
            name: 'HAH',
            symbol: 'HAH',
            decimals: 18
        },
        blockExplorerUrls: ['https://scan-testnet.hashahead.org/'],
        iconUrls: ['https://testnet.hashahead.org/logo.png']
    }
}

export { config }
