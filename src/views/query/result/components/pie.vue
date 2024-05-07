<template>
  <a-spin :loading="loading" style="width: 100%">
    <Chart style="width: 100%; height: 300px" :option="chartOption" />
  </a-spin>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import useChartOption from '@/hooks/chart-option';

  const props = defineProps({
    res: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const colorArr = ['#249EFF', '#846BCE', '#21CCFF', '#0E42D2', '#86DF6C'];
  function getLinePoint(n: number, idx: number) {
    const interval = 100 / (n + 1);
    const x = (idx + 1) * interval;
    return x;
  }

  const genPieData = (options: {
    xPercent: number;
    isDark: boolean;
    data: [string, number][];
  }) => {
    const { xPercent = 50, isDark, data } = options;
    return {
      type: 'pie',
      radius: ['50%', '70%'],
      center: [`${xPercent}%`, '50%'],
      label: {
        formatter: '{d}% ',
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
      },
      itemStyle: {
        borderColor: isDark ? '#000' : '#fff',
        borderWidth: 1,
      },
      data: data.map(([label, value], idx) => ({
        value: [value],
        name: label,
        itemStyle: {
          color: colorArr[idx],
        },
      })),
    };
  };

  const { chartOption } = useChartOption((isDark) => {
    const graphicElementStyle = {
      textAlign: 'center',
      fill: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
      fontSize: 14,
      lineWidth: 10,
      fontWeight: 'bold',
    };
    return {
      tooltip: {
        show: true,
        trigger: 'item',
      },
      graphic: {
        elements: Object.entries(props.res).map(([title], idx, arr) => ({
          type: 'text',
          left: `${getLinePoint(arr.length, idx) - 2.4}%`,
          top: 'center',
          style: {
            text: title,
            ...graphicElementStyle,
          },
        })),
      },
      series: Object.entries(props.res).map(([, data], idx, arr) => {
        return genPieData({
          isDark,
          xPercent: getLinePoint(arr.length, idx),
          data,
        });
      }),
    } as any;
  });
  const { loading } = useLoading(false);
</script>
