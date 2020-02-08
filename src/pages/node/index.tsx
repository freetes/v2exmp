import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import moment from 'moment'

import './index.scss'

moment.locale('zh-cn')

export default class Node extends Component {
  state = {
    nodeInfo: {},
    topics: []
  }

  componentWillMount () {
    const id = this.$router.params.id

    Taro.showLoading({
      title: '获取节点数据中...'
    })

    Taro.request({
      url: 'https://www.v2ex.com/api/nodes/show.json?id=' + id
    }).then(res=>{
      this.setState({
        nodeInfo: res.data
      })

      Taro.setNavigationBarTitle({title: res.data.title})

      Taro.showLoading({
        title: '获取评论数据中...'
      })
    }).then(()=>{
      Taro.request({
        url: 'https://www.v2ex.com/api/topics/show.json?node_id=' + id
      }).then(res=>{
        this.setState({
          topics: res.data
        })
  
        Taro.hideLoading()
      })
  
    })

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config: Config = {
    navigationBarTitleText: '节点信息'
  }

  goto = (id)=>{
    Taro.navigateTo({
      url: '/pages/topic/index?id=' + id
    })
  }

  render () {
    const {nodeInfo, topics} = this.state

    const content = topics.map(item=>{
      return (
        <View className='topic-div' key={String(item.id)}>
          <View className='creater-div'>
            <Image className='user-image' src={'https://' + item.member.avatar_mini}/>
            <Text className='user-name'>{ item.member.username }</Text>
          </View>
          <View className='title' onClick={this.goto.bind(this, item.id)}>{ item.title }</View>
          <View className='others'>
            <Text className=''>{ moment(item.created * 1000).fromNow() }</Text>
            <Text className=''>回复数: { item.replies }</Text>
          </View>
        </View>
      )
    })

    return (
      <View className='index'>
        <View className='node-div'>
          <Image className='node-image' src={'https://' + nodeInfo.avatar_normal}/>
          <View className='info-div'>
            <Text className='topics-number'>总主题数：{ nodeInfo.topics }</Text>
            <Text className='words'>{nodeInfo.header}</Text>
          </View>
        </View>
        
        {content}

        {/* <View className='footer'>
          <Text>我也是有底线的人</Text>
        </View> */}
      </View>
    )
  }
}
