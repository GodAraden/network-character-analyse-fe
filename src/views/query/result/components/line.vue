<template>
  <a-spin :loading="loading" style="width: 100%">
    <Chart style="height: 328px" :option="chartOption" />
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { LineSeriesOption } from 'echarts';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useChartOption from '@/hooks/chart-option';

  const props = defineProps({
    res: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${
            el.color
          }" class="tooltip-item-icon"></span><span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">${el.value.toLocaleString()}</span>
      </div>`
      )
      .reverse()
      .join('');
  };

  const lineColorArr = ['#722ED1', '#F77234', '#33D1C9', '#3469FF'];
  const itemBorderColorArr = ['#F5E8FF', '#FFE4BA', '#E8FFFB', '#E8F3FF'];

  const generateSeries = (options: {
    name: string;
    lineColor: string;
    itemBorderColor: string;
    data: number[];
  }): LineSeriesOption => {
    const { name, lineColor, itemBorderColor, data } = options;
    return {
      name,
      data,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        color: lineColor,
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          color: lineColor,
          borderWidth: 2,
          borderColor: itemBorderColor,
        },
      },
      lineStyle: {
        width: 2,
        color: lineColor,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.1,
        color: lineColor,
      },
    };
  };
  const { loading, setLoading } = useLoading(true);
  const chartData = ref<any[]>([]);
  const xAxis = ref<string[]>([]);
  const { chartOption } = useChartOption((dark) => {
    return {
      grid: {
        left: '40',
        right: '40',
        top: '20',
        bottom: '40',
      },
      xAxis: {
        type: 'category',
        data: xAxis.value,
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: dark ? '#2E2E30' : '#F2F3F5',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      series: chartData.value.map((item) => generateSeries(item)),
    };
  });
  const fetchData = async () => {
    setLoading(true);
    try {
      const analyse = Object.entries(props.res);
      analyse.forEach(([key, value], idx) => {
        xAxis.value = value.map((item: any) => item[0]);
        chartData.value.push({
          name: key,
          lineColor: lineColorArr[idx],
          itemBorderColor: itemBorderColorArr[idx],
          data: value.map((item: any) => item[1]),
        });
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>
