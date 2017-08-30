import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/notification';
import { getApiFilter, getVisibleApis, apisActions } from 'src/controllers/apis';
import Notification from '../../components/notification';
import ApiList from '../../components/api-list';


export class ApiListPage extends Component {
    static propTypes = {
        createApi: PropTypes.func.isRequired,
        dismissNotification: PropTypes.func.isRequired,
        filterApis: PropTypes.func.isRequired,
        filterType: PropTypes.string.isRequired,
        loadApis: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        notification: PropTypes.object.isRequired,
        removeApi: PropTypes.func.isRequired,
        apis: PropTypes.instanceOf(List).isRequired,
        undeleteApi: PropTypes.func.isRequired,
        unloadApis: PropTypes.func.isRequired,
        updateApi: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.loadApis();
        this.props.filterApis(
            this.getFilterParam(this.props.location.search)
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            this.props.filterApis(
                this.getFilterParam(nextProps.location.search)
            );
        }
    }

    componentWillUnmount() {
        this.props.unloadApis();
    }

    getFilterParam(search) {
        const params = new URLSearchParams(search);
        return params.get('filter');
    }

    renderNotification() {
        const { notification } = this.props;
        return (
            <Notification
                action={this.props.undeleteApi}
                actionLabel={notification.actionLabel}
                dismiss={this.props.dismissNotification}
                display={notification.display}
                message={notification.message}
            />
        );
    }

    render() {
        return (
            <div className="g-row">

                <div className="g-col">
                    <ApiList
                        removeApi={this.props.removeApi}
                        apis={this.props.apis}
                        updateApi={this.props.updateApi}
                    />
                </div>

                {this.props.notification.display ? this.renderNotification() : null}
            </div>
        );
    }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
    getNotification,
    getApiFilter,
    getVisibleApis,
    (notification, filterType, apis) => ({
        notification,
        filterType,
        apis
    })
);

const mapDispatchToProps = Object.assign(
    {},
    apisActions,
    notificationActions
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApiListPage);
