import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'

export default class Nodes extends Component {
  state = {
    nodes: []
  }

  componentWillMount () {
    Taro.showLoading({
      title: '获取节点数据中...'
    })

    Taro.request({
      url: 'https://www.v2ex.com/api/nodes/all.json'
    }).then(res=>{
      // 数据过滤排序
      let data = res.data.filter(item=>item.topics>1000).sort((a, b)=>b.topics - a.topics)
      
      this.setState({
        nodes: data
      })
      Taro.hideLoading()
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config: Config = {
    navigationBarTitleText: '节点'
  }

  goto = (id)=>{
    Taro.navigateTo({
      url: '/pages/node/index?id=' + id
    })
  }

  render () {
    let {nodes} = this.state

    const nodesContent = nodes.map(item=>{
      return (
        // 节点
        <View className='node-div' key={String(item.id)} onClick={this.goto.bind(this, item.id)}>
          <Image className='node-image' src={'https://' + item.avatar_normal}/>
          <View className='node-info-div'>
            <Text className='name'>{ item.title }</Text>
            <Text className='topics'>主题数：{ item.topics }</Text>
            <Text className='stars'>关注数：{ item.stars }</Text>
          </View>
        </View>
      )
    })

    return (
      <View className='index'>
        {nodesContent}
        {/* <View className='footer'>
          <Text>我也是有底线的人</Text>
        </View> */}
      </View>
    )
  }
}
