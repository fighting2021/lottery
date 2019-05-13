import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Statistic } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.jpg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>福利彩票广州站</Card.Header>
            <Card.Meta>
                <p>管理员：{props.manager}</p>
                <p>当前用户：{props.currentPlayer}</p>
                <p>上期中奖者：{props.winner}</p>
            </Card.Meta>
            <Card.Description>
                每晚八点准时开奖, 不见不散!
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.playerCount} 人参与
            </a>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href={props.contractUrl} target='_blank'>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>
        <Button animated='fade' color='orange' onClick={props.play} loading={props.isPlaying}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden>购买放飞梦想</Button.Content>
        </Button>
        <Button inverted color='red' onClick={props.kaiJiang} loading={props.isKaiJiang} style={{display : props.isShowButton}}>
            开奖
        </Button>
        <Button inverted color='orange' onClick={props.tuiJiang} loading={props.isTuiJiang} style={{display : props.isShowButton}}>
            退奖
        </Button>
    </Card>
)

// 在ES6语法中，如果使用export导出，那么就要使用import导入
export default CardExampleCard