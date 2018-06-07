<template lang="pug">
  .statics-wrapper
    canvas(id="myChart")
</template>

<script>
import F2 from '@antv/f2'
export default {
  name: 'statics',
  data () {
    return {
      source: [{
        day: '周一',
        value: 300
      }, {
        day: '周二',
        value: 400
      }, {
        day: '周三',
        value: 350
      }, {
        day: '周四',
        value: 500
      }, {
        day: '周五',
        value: 490
      }, {
        day: '周六',
        value: 600
      }, {
        day: '周日',
        value: 900
      }]
    }
  },
  mounted () {
    const chart = new F2.Chart({
      id: 'myChart',
      width: window.innerWidth,
      height: window.innerWidth > window.innerHeight ? window.innerHeight - 54 : window.innerWidth * 0.707,
      pixelRatio: window.devicePixelRatio, // 指定分辨率
    })
    chart.source(this.source, {
      value: {
        tickCount: 5,
        min: 0
      },
      day: {
        range: [0, 1]
      }
    })
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      onShow: function onShow (ev) {
        var items = ev.items
        items[0].name = null
        items[0].value = '$ ' + items[0].value
      }
    })
    chart.axis('day', {
      label: function label (text, index, total) {
        var textCfg = {}
        if (index === 0) {
          textCfg.textAlign = 'left'
        } else if (index === total - 1) {
          textCfg.textAlign = 'right'
        }
        return textCfg
      }
    })
    chart.line().position('day*value')
    chart.point().position('day*value').style({
      stroke: '#fff',
      lineWidth: 1
    })
    chart.render()
  }
}
</script>

<style lang="stylus" scoped>
  .statics-wrapper
    background #fff
</style>
