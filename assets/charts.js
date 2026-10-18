/* Charts for the Agent work archive. Colors are derived from the page's CSS variables. */
(function () {
  'use strict';
  if (typeof echarts === 'undefined') return;

  var style = getComputedStyle(document.documentElement);
  function cssVar(name, fallback) {
    return style.getPropertyValue(name).trim() || fallback;
  }

  var accent = cssVar('--accent', '#3B5BFF');
  var accent2 = cssVar('--accent2', '#D6560F');
  var ink = cssVar('--ink', '#14161B');
  var muted = cssVar('--muted', '#64686E');
  var rule = cssVar('--rule', '#E2DED4');
  var card = cssVar('--card', '#FFFFFF');

  /* ---------- Chart 1: per-agent collaboration counts ---------- */
  var agentData = [
    { name: 'Claude', value: 42 },
    { name: 'Cursor', value: 31 },
    { name: 'Trae', value: 26 },
    { name: 'ChatGPT', value: 24 },
    { name: 'Gemini', value: 15 },
    { name: 'GitHub Copilot', value: 13 },
    { name: 'Deep Research', value: 11 },
    { name: 'Whisper / 听悟', value: 9 },
    { name: '即梦 / Midjourney', value: 7 }
  ];
  var agentNames = agentData.map(function (d) { return d.name; }).reverse();
  var agentValues = agentData.map(function (d) { return d.value; }).reverse();

  var agentEl = document.getElementById('chart-agents');
  if (agentEl) {
    var chartAgents = echarts.init(agentEl, null, { renderer: 'svg' });
    chartAgents.setOption({
      animation: false,
      grid: { left: 0, right: 46, top: 10, bottom: 4, containLabel: true },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        formatter: function (params) {
          return params[0].name + '：' + params[0].value + ' 次';
        }
      },
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: rule } },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'category',
        data: agentNames,
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: ink, fontSize: 12 }
      },
      series: [{
        type: 'bar',
        data: agentValues,
        barWidth: '56%',
        itemStyle: { color: accent, borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: 'right', color: muted, fontSize: 11, formatter: '{c}' }
      }]
    });
    window.addEventListener('resize', function () { chartAgents.resize(); });
  }

  /* ---------- Chart 2: outcome type distribution ---------- */
  var resultEl = document.getElementById('chart-results');
  if (resultEl) {
    var chartResults = echarts.init(resultEl, null, { renderer: 'svg' });
    chartResults.setOption({
      animation: false,
      color: [accent, accent2, muted, accent + '99', accent2 + '99'],
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: '{b}：{c} 项（{d}%）'
      },
      legend: {
        bottom: 0,
        left: 'center',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 14,
        textStyle: { color: muted, fontSize: 11.5 }
      },
      series: [{
        type: 'pie',
        radius: ['46%', '70%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: card, borderWidth: 2 },
        label: { show: false },
        labelLine: { show: false },
        data: [
          { name: '交付文档', value: 14 },
          { name: '代码与功能', value: 9 },
          { name: '数据与分析', value: 7 },
          { name: '设计素材', value: 4 },
          { name: '自动化流程', value: 2 }
        ]
      }]
    });
    window.addEventListener('resize', function () { chartResults.resize(); });
  }
})();
