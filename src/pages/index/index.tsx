import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import moment from 'moment'

import './index.scss'

moment.locale('zh-cn')

export default class Index extends Component {
  state = {
    topics: []
  }

  componentWillMount () {
    Taro.showLoading({
      title: '获取热点数据中...'
    })

    Taro.request({
      url: 'https://www.v2ex.com/api/topics/hot.json'
    }).then(res=>{
      this.setState({
        topics: res.data
      })

      Taro.hideLoading()
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  goto = (id)=>{
    Taro.navigateTo({
      url: '/pages/topic/index?id=' + id
    })
  }

  render () {
    const {topics} = this.state

    const content = topics.map(item=>{
      return (
        <View className='topic-div' key={String(item.id)}>
          <View className='creater-div'>
            <Image className='user-image' src={'https://' + item.member.avatar_mini}/>
            <Text className='user-name'>{ item.member.username }</Text>
            <Text className='time'>{ moment(item.created * 1000).fromNow() }</Text>
          </View>
          <View className='title' onClick={this.goto.bind(this, item.id)}>{ item.title }</View>
          <View className='others'>
            <Text className='tag'>{ item.node.title }</Text>
            <Text className=''>{ moment(item.created * 1000).fromNow() }</Text>
            <Text className=''>回复数: { item.replies }</Text>
          </View>
        </View>
      )
    })

    return (
      <View className='index'>
        {content}

        {/* <View className='footer'>
          <Text>我也是有底线的人</Text>
        </View> */}
      </View>
    )
  }
}
