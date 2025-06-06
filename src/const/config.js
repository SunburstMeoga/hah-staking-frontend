import abi from './abi.json'
import cross_abi from './cross_abi.json'
const config = {
    erc20_abi: abi,
    cross_abi: cross_abi,
    con_addr: '0x00000000000000000000000000000000000000A1',
    unit: 'Gwei',
    amount: '10',
    chainId: '0x329',
    // chainId: '0x11623',
    chainName: 'Hash Ahead Mainnet',
    rpcUrls: 'https://rpc.hashahead.org',
    // rpcUrls: 'https://rpc-testnet.hashahead.org/mrpc',
    blockExplorerUrls: 'https://scan.hashahead.org/',

    // 完整的链配置信息，用于添加链到MetaMask
    chainConfig: {
        chainId: '0x329', // 809 in decimal
        chainName: 'Hash Ahead Mainnet',
        rpcUrls: ['https://rpc.hashahead.org'],
        nativeCurrency: {
            name: 'HAH',
            symbol: 'HAH',
            decimals: 18
        },
        blockExplorerUrls: ['https://scan.hashahead.org/'],
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
