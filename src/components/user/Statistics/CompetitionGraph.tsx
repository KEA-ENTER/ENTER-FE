import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface DataItem {
    round: number;
    competitionRate: string;
}

interface BarChartProps {
    data: DataItem[];
}

const CompetitionGraph: React.FC<BarChartProps> = ({ data }) => {
    const formattedData = data.map(item => {
        const competitionRate = parseFloat(item.competitionRate);
        return {
          round: `${item.round}회`,
          competitionRate: isNaN(competitionRate) ? 0 : competitionRate,
        };
      });

  return (
    <ResponsiveBar
      data={formattedData}
      keys={['competitionRate']}
      indexBy="round"
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      padding={0.3}
      layout="vertical"
      colors='#FFD400'
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '회차',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '경쟁률',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      animate={true}
      motionConfig="gentle"
      minValue={0}
    />
  );
};

export default CompetitionGraph;
