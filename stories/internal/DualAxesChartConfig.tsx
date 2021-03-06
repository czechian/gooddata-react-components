// (C) 2007-2018 GoodData Corporation
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { screenshotWrap } from '@gooddata/test-storybook';
import * as dataSet from '../test_data/chart_with_2_metrics_and_view_by_attribute';
import { Visualization } from '../../src/components/visualizations/Visualization';
import { wrap } from '../utils/wrap';
import '../../styles/scss/charts.scss';
import { supportedDualAxesChartTypes } from '../../src/components/visualizations/chart/chartOptionsBuilder';
import { IChartConfig, VisualizationTypes } from '../../src';
import { barChartWithoutAttributes } from '../test_data/fixtures';

const NOT_SET = 'not set';
const MinMaxInfo = ({ minLeft = NOT_SET, maxLeft = NOT_SET, minRight = NOT_SET, maxRight = NOT_SET }: any) => (
    <div>
        <div>Left: Min({minLeft}), Max({maxLeft})</div>
        <div>Right: Min({minRight}), Max({maxRight})</div>
    </div>
);

const renderSupportedCharts = (
    dataset: any,
    config?: IChartConfig,
    minmaxInfo = {}) => (
        <div>
            {supportedDualAxesChartTypes.map((type) => {
                const _config: IChartConfig = {
                    type,
                    legend: {
                        enabled: true,
                        position: 'top'
                    },
                    secondary_yaxis: {
                        measures: ['wonMetric']
                    },
                    ...config
                };

                if (type === VisualizationTypes.BAR) {
                    _config.xaxis = _config.yaxis;
                    _config.secondary_xaxis = _config.secondary_yaxis;
                    _config.yaxis = _config.secondary_yaxis = undefined;
                }

                return (
                    wrap(
                        <div>
                            <MinMaxInfo {...minmaxInfo}/>
                            <Visualization config={_config} {...dataset}/>
                        </div>
                    )
                );
            })}
        </div>
    );

const getMinMaxConfig: any = (
    minLeft = undefined as string, maxLeft = undefined as string,
    minRight = undefined as string, maxRight = undefined as string) =>
    ({
        config: {
            yaxis: {
                min: minLeft,
                max: maxLeft
            },
            secondary_yaxis: {
                min: minRight,
                max: maxRight,
                measures: ['wonMetric']
            }
        },
        info: {
            minLeft, maxLeft, minRight, maxRight
        }
    });

storiesOf('Internal/DualAxesMinMaxConfig', module)
    .add('Dataset with 0+ data on both axes', () => {
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.positiveDataset)}
            </div>
        );
    })
    .add('Dataset with 0+ data on both axes, with max setting', () => {
        const { config, info } = getMinMaxConfig(undefined, '500', undefined, '4000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.positiveDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ data on both axes, min >= max', () => {
        const { config, info } = getMinMaxConfig('600', '500', '4000', '4000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.positiveDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ data on both axes, with min setting', () => {
        const { config, info } = getMinMaxConfig('100', null, '1000', null);
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.positiveDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ data on both axes, with min and max settings', () => {
        const { config, info } = getMinMaxConfig('50', '100', '1000', '4000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.positiveDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with -0 data on both axes', () => {
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.negativeDataset)}
            </div>
        );
    })
    .add('Dataset with -0 data on both axes, with max setting', () => {
        const { config, info } = getMinMaxConfig(null, '-50', null, '-1000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.negativeDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with -0 data on both axes, with min and max settings', () => {
        const { config, info } = getMinMaxConfig('-500', '50', '-4000', '-1000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.negativeDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis', () => {
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis, stretch Y axes', () => {
        const { config, info } = getMinMaxConfig(null, '10000', '-10000', null);
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis, shrink left Y axis', () => {
        const { config, info } = getMinMaxConfig('10000', null, null, null);
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis, shrink right Y axis', () => {
        const { config, info } = getMinMaxConfig(null, null, null, '-10000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis, empty left axis', () => {
        const { config, info } = getMinMaxConfig(null, '0', null, null);
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis, empty right axis', () => {
        const { config, info } = getMinMaxConfig(null, null, '0', null);
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis, empty chart', () => {
        const { config, info } = getMinMaxConfig(null, '0', '0', null);
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis with min max settings in same scale', () => {
        const { config, info } = getMinMaxConfig('-400', '400', '-5000', '5000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with 0+ on left axis, -0 on right axis with min max settings not in same scale', () => {
        const { config, info } = getMinMaxConfig('-212', '312', '-4123', '2123');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.oneNegativeSideDataset, config, info)}
            </div>
        );
    })
    .add('Dataset with -0 and 0+ on left axis, -0 on right axis', () => {
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.mixDataset02)}
            </div>
        );
    })
    .add('Dataset with -0 and 0+ on left axis, -0 on right axis with min max settings', () => {
        const { config, info } = getMinMaxConfig('0', '400', '-5000', '5000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.mixDataset02, config, info)}
            </div>
        );
    })
    .add('Dataset with -0 and 0+ on left axis, -0 and +0 on right axis', () => {
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.mixDataset01)}
            </div>
        );
    })
    .add('Dataset with -0 and 0+ on left axis, -0 and +0 on right axis with min and max settings', () => {
        const { config, info } = getMinMaxConfig('-200', '200', '-10000', '5000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.mixDataset01, config, info)}
            </div>
        );
    })
    .add('Dataset with -0 and 0+ on left axis, -0 and +0 on right axis with 0+ min and max settings', () => {
        const { config, info } = getMinMaxConfig('0', '200', '0', '5000');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.mixDataset01, config, info)}
            </div>
        );
    })
    .add('Dataset with -0 and 0+ on left axis, -0 and +0 on right axis with -0 min and max settings', () => {
        const { config, info } = getMinMaxConfig('-100', '0', '-4500', '0');
        return screenshotWrap(
            <div>
                {renderSupportedCharts(dataSet.mixDataset01, config, info)}
            </div>
        );
    })
    .add('Dataset without attribute', () => {
        const config = {
            secondary_yaxis: {
                measures: ['snapshotMetric']
            }
        };
        return screenshotWrap(
            <div>
                {renderSupportedCharts(barChartWithoutAttributes, config)}
            </div>
        );
    });
