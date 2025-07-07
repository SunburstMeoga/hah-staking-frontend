import abi from './abi.json'
import cross_abi from './cross_abi.json'
const config = {
    erc20_abi: abi,
    cross_abi: cross_abi,
    con_addr: '0x00000000000000000000000000000000000000A1',
    unit: 'Gwei',
    amount: '10',
    chainId: '0x2BF',    // 生产环境主链 703
    // chainId: '0x11623', // 测试环境主链 71203
    chainName: 'Hash Ahead Mainnet',
    rpcUrls: 'https://rpc.hashahead.org',
    // rpcUrls: 'https://rpc-testnet.hashahead.org/mrpc',
    blockExplorerUrls: 'https://scan.hashahead.org/',
}

export { config }
