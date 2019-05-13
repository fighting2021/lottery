import React, {Component} from 'react';
import CardExampleCard from './display/ui';

// 导入合约实例
let contractInstance = require('./eth/lottery')
let web3 = require('./utils/InitWeb3')

class App extends Component {

    constructor() {
        super()
        this.state = {
            manager: '',
            winner: '',
            round: 0,
            balance: 0,
            players: [],
            playerCounts: 0,
            currentPlayer: '',
        }
    }

    // 在页面渲染后自动调用
    componentDidMount() {
        console.log("执行componnetDidMount方法...")
    }

    // 在页面渲染前自动执行
    async componentWillMount() {
        console.log("执行 componnetWillMount方法...")
        let manager = await contractInstance.methods.getManagerAddress().call()
        let winner = await contractInstance.methods.getWinner().call()
        let round = await contractInstance.methods.getRound().call()
        let balanceWei = await contractInstance.methods.getAmount().call()
        //从wei单位转换为'ether'单位
        let balance = web3.utils.fromWei(balanceWei, 'ether')
        let players = await contractInstance.methods.getPlays().call()
        let playerCount = await players.length
        let allPlayers = await web3.eth.getAccounts()

        // 如果当前用户为管理员，就把display属性设置为inline，否则设置为none
        let isShowButton = allPlayers[0] == manager ? 'inline' : 'none'
        // 合约链接地址
        let contractUrl = 'https://ropsten.etherscan.io/address/' + contractInstance.options.address
        this.setState({
            manager,
            winner,
            round,
            balance,
            players,
            playerCount,
            currentPlayer: allPlayers[0],
            isPlaying : false,
            isKaiJiang : false,
            isTuiJiang : false,
            isShowButton,
            contractUrl : contractUrl,
        })
    }

    // 投注功能实现
    play = async () => {
        this.setState({isPlaying: true})
        let players = await web3.eth.getAccounts()
        try {
            await contractInstance.methods.play().send({
                from: players[0],    // 投注人
                value: web3.utils.toWei('1', 'ether'), // 投注金额
                gas: '3000000', // 油费上限
            })
        } catch (e) {
            alert('投注失败')
            console.log(e)
        }
        this.setState({isPlaying: false})
    }

    // 开奖
    kaiJiang = async () => {
        this.setState({isKaiJiang: true})
        let players = await web3.eth.getAccounts()
        try {
            await contractInstance.methods.kaiJIang().send({
                from : players[0],
                gas : '3000000',
            })
        } catch (e) {
            alert('开奖失败')
            console.log(e)
        }
        this.setState({isKaiJiang: false})
    }

    // 退奖
    tuiJiang = async () => {
        this.setState({isTuiJiang: true})
        let players = await web3.eth.getAccounts()
        try {
            await contractInstance.methods.tuiJiang().send({
                from : players[0],
                gas : '3000000',
            })
        } catch (e) {
            alert('退奖失败')
            console.log(e)
        }
        this.setState({isTuiJiang: false})
    }

    // 渲染页面
    render() {
        return (
            <div>
                <CardExampleCard
                    manager={this.state.manager}
                    currentPlayer={this.state.currentPlayer}
                    playerCount={this.state.playerCount}
                    balance={this.state.balance}
                    round={this.state.round}
                    isPlaying={this.state.isPlaying}
                    isKaiJiang={this.state.isKaiJiang}
                    isTuiJiang={this.state.isTuiJiang}
                    isShowButton={this.state.isShowButton}
                    winner={this.state.winner}
                    contractUrl={this.state.contractUrl}
                    play={this.play}
                    kaiJiang={this.kaiJiang}
                    tuiJiang={this.tuiJiang}
                />
            </div>
        );
    }
}

export default App;
