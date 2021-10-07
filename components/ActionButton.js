import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { Button } from "galio-framework";

import argonTheme from "../constants/Theme";

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    let btn = {};

    this.toggleButtonState = this.toggleButtonState.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    if (props.buttonInfo !== undefined && props.buttonInfo != null && typeof props.buttonInfo == 'function') {
        btn = this._buttonInfo = props.buttonInfo();
    }
    else {
        btn = this._buttonInfo = props.buttonInfo;
    }

    this._link = props.buttonLink ? props.buttonLink : (btn.buttonLink ? btn.buttonLink : null);
    this._needsAuthorization = props.needsAuthorization ? props.needsAuthorization : (btn.needsAuthorization ? btn.needsAuthorization : true);
    this._hasFormData = props.hasFormData ? props.hasFormData : (btn.hasFormData ? btn.hasFormData : false);
    this._baseValidator = props.baseValidator ? props.baseValidator : (btn.baseValidator ? btn.baseValidator : null);
    this._data = props.data ? props.data : (btn.data ? btn.data : null);
    this._dataParams = props.dataParams ? props.dataParams : (btn.dataParams ? btn.dataParams : null);
    this._where = props.whereClause ? props.whereClause : (btn.whereClause ? btn.whereClause : null);
    this._whereClauseParams = props.whereClauseParams ? props.whereClauseParams : (btn.whereClauseParams ? btn.whereClauseParams : null);
    this._successCallback = props.successCallback ? props.successCallback : (btn.successCallback ? btn.successCallback : null);
    this._failedCallback = props.failedCallback ? props.failedCallback : (btn.failedCallback ? btn.failedCallback : null);

    this._id = props.id ? props.id : (btn.id ? btn.id : null);
    this._name = props.name ? props.name : (btn.name ? btn.name : null);
    this._title = props.title ? props.title : (btn.title ? btn.title : null);
    this._buttonClasses = props.className ? props.className : (btn.className ? btn.className : null);
    this._iconClass = props.iconClass ? props.iconClass : (btn.iconClass ? btn.iconClass : null);
    this._label = props.label ? props.label : (btn.label ? btn.label : null);
    this._actionEndPoint = props.actionEndPoint ? props.actionEndPoint : (btn.actionEndPoint ? btn.actionEndPoint : null);
    
    this.state = {
        isBusy: false
    };
    if (props.href !== undefined && props.href != null && props.href.length > 0) {
        this._href = props.href;
    }
    else if (btn.href !== undefined && btn.href != null && btn.href.length > 0) {
        this._href = btn.href;
    }
    else {
        this._href = null
    }
}

toggleButtonState(state) {
    if(state !== undefined && state != null)
    {
        this.setState({
            isBusy: state
        })
    }
    else{
        this.setState({
            isBusy: !this.state.isBusy
        });
    }
}

componentDidMount() {

}

async buttonClicked(event, skipValidations = 0) {
    if (
        this._baseValidator !== undefined &&
        this._baseValidator !== null && !(skipValidations > 0)
    ) {
        this._baseValidator.validate().then(async function(result) {
            if (result) {
                await this.clicked(event);
            }
        });
    } else {
        await this.clicked(event);
    }
}

  render() {
    const { small, shadowless, children, color, style, ...props } = this.props;
    
    const colorStyle = color && argonTheme.COLORS[color.toUpperCase()];

    const buttonStyles = [
      small && styles.smallButton,
      color && { backgroundColor: colorStyle },
      !shadowless && styles.shadow,
      {...style}
    ];

    return (
      <Button
        style={buttonStyles}
        shadowless
        textStyle={{ fontSize: 12, fontWeight: '700' }}
        {...props}
      >
        {children}
      </Button>
    );
  }

  async clicked(event) {
    var btn = this;
    var requestType = "post";
    var data = null;
    var where = null;
    var actionEndPoint = this._actionEndPoint;

    if (actionEndPoint === null) {
        return false;
    }

    if (
        this._buttonInfo.requestType !== undefined &&
        this._buttonInfo.requestType !== null &&
        this._buttonInfo.requestType.length > 0
    ) {
        requestType = this._buttonInfo.requestType;
    }

    if (this._data !== undefined && this._data !== null && typeof this._data === 'function') {
        data = this._data(this._dataParameter);
    } else {
        data = this._data
    }

    if (this._where !== undefined && this._where !== null && typeof this._where === 'function') {
        where = this._where(this._whereClauseParams);
    }

    if (
        this._buttonInfo.needsConfirmation !== undefined &&
        this._buttonInfo.needsConfirmation !== null &&
        this._buttonInfo.needsConfirmation === true
    ) {
        let confirmButtonClass = "btn btn-sm btn-danger"
        let cancelButtonClass = "btn btn-sm btn-secondary"
        var confirmationMessage = "Are you sure you want to Continue?";
        if (
            this._buttonInfo.confirmationMessage !== undefined &&
            this._buttonInfo.confirmationMessage !== null &&
            this._buttonInfo.confirmationMessage.length > 0
        ) {
            confirmationMessage = this._buttonInfo.confirmationMessage;
        }

        if (
            this._buttonInfo.confirmButtonClass !== undefined &&
            this._buttonInfo.confirmButtonClass !== null &&
            this._buttonInfo.confirmButtonClass.length > 0
        ) {
            confirmButtonClass = this._buttonInfo.confirmButtonClass;
        }

        if (
            this._buttonInfo.cancelButtonClass !== undefined &&
            this._buttonInfo.cancelButtonClass !== null &&
            this._buttonInfo.cancelButtonClass.length > 0
        ) {
            cancelButtonClass = this._buttonInfo.cancelButtonClass;
        }

        Swal.fire({
            text: confirmationMessage,
            showCancelButton: true,
            confirmButtonText: "Yes, Please!",
            cancelButtonText: "No, Cancel!",
            confirmButtonClass: confirmButtonClass,
            cancelButtonClass: cancelButtonClass
        }).then(async function (result) {
            if (result.value) {
                await btn.request(requestType, actionEndPoint, data, where);
            }
        });
    } else {
        await btn.request(requestType, actionEndPoint, data, where);
    }
}

async request(requestType, actionEndPoint, data, where) {
    const token = 'QpJ62fbx2stgcCL8o5hraTkldaMrNveTa3ZQScjL';// await authService.getAccessToken();
    var btn = this;
    let headers = { 'content-type': 'application/json' };
    btn.toggleButtonState(true)
    var requestPayLoad = null;
    if (btn._needsAuthorization) {
        headers = { 'content-type': 'application/json', 'authorization': `Bearer ${token}` }
    }
    if (btn._hasFormData !== undefined && btn._hasFormData != null && btn._hasFormData === true) {
        delete headers['content-type']
        headers['Accept'] = 'application/json';
        requestPayLoad = data
    } else {
        requestPayLoad = { data: JSON.stringify(data), where: JSON.stringify(where) }
    }

    if (requestType !== 'delete') {
        axios[requestType](actionEndPoint, requestPayLoad, { headers: headers })
            .then(function (result) {
                btn.handleResponse(result);
                btn.toggleButtonState(false);
            })
            .catch(function (error) {
                console.log(error);
                btn.responseError(error);
                btn.toggleButtonState(false);
            });
    } else {
        axios[requestType](actionEndPoint, { headers: headers })
            .then(function (result) {
                btn.handleResponse(result);
                btn.toggleButtonState(false);
            })
            .catch(function (error) {
                console.log(error);
                btn.responseError(error);
                btn.toggleButtonState(false);
            });
    }
}
handleResponse(result) {
    var response = result.data;
    if (parseInt(response.warning) === 1) {
        this.responseWarning(response);
    } else {
        this.responseSuccess(response);
    }
}

responseError(response) {
    if (this._failedCallback !== undefined && this._failedCallback !== null) {
        if (
            response.actionMessage !== undefined &&
            response.actionMessage !== null &&
            response.actionMessage.length > 0
        ) {
            Swal.fire("Failed!", response.actionMessage, "error");
        } else if (
            this._buttonInfo.errorMessage !== undefined &&
            this._buttonInfo.errorMessage !== null &&
            this._buttonInfo.errorMessage.length > 0
        ) {
            Swal.fire("Failed!", this._buttonInfo.errorMessage, "error");
        }
        return this._failedCallback(response);
    }

    if (
        response.actionMessage !== undefined &&
        response.actionMessage !== null &&
        response.actionMessage.length > 0
    ) {
        Swal.fire("Failed!", response.actionMessage, "error");
    } else if (
        this._buttonInfo.errorMessage !== undefined &&
        this._buttonInfo.errorMessage !== null &&
        this._buttonInfo.errorMessage.length > 0
    ) {
        Swal.fire("Failed!", this._buttonInfo.errorMessage, "error");
    } else {
        Swal.fire("Action could not be performed. Please try again later", "Failed!", "error");
    }
}
showSuccessMessage() {
    if (this._buttonInfo.showSuccessMessage !== undefined && this._buttonInfo.showSuccessMessage != null) {
        return this._buttonInfo.showSuccessMessage;
    }
    return true;
}
responseSuccess(response) {
    let actionMessage = "";
    if (this._successCallback !== undefined && this._successCallback != null) {
        if (
            response.actionMessage !== undefined &&
            response.actionMessage != null &&
            response.actionMessage.length > 0
        ) {
            actionMessage = response.actionMessage;
        } else if (
            this._buttonInfo.successMessage !== undefined &&
            this._buttonInfo.successMessage != null &&
            this._buttonInfo.successMessage.length > 0
        ) {
            actionMessage = this._buttonInfo.successMessage;
        }
        if (actionMessage.trim().length > 0) {
            Swal.fire("Success!", actionMessage, "success");
        }
        return this._successCallback(response);
    }

    if (
        response.actionMessage !== undefined &&
        response.actionMessage != null &&
        response.actionMessage.length > 0
    ) {
        actionMessage = response.actionMessage;
    } else if (
        this._buttonInfo.successMessage !== undefined &&
        this._buttonInfo.successMessage != null &&
        this._buttonInfo.successMessage.length > 0
    ) {
        actionMessage = this._buttonInfo.successMessage;
    } else if (this.ShowSuccessMessage()) {
        actionMessage = "Action has been completed successfully";
    }
    if (actionMessage.trim().length > 0) {
        Swal.fire("Success!", actionMessage, "success");
    }
}
responseWarning(response) {
    if (
        response.actionMessage !== undefined &&
        response.actionMessage != null &&
        response.actionMessage.length > 0
    ) {
        alert("warning", response.actionMessage);
    } else if (
        this._buttonInfo.warningMessage !== undefined &&
        this._buttonInfo.warningMessage != null &&
        this._buttonInfo.warningMessage.length > 0
    ) {
        alert("warning", this._buttonInfo.warningMessage);
    } else if (this.ShowSuccessMessage()) {
        alert("warning", "Data already exists");
    }
}
}

ArButton.propTypes = {
  small: PropTypes.bool,
  shadowless: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'error', 'success', 'warning'])
  ])
}

const styles = StyleSheet.create({
  smallButton: {
    width: 75,
    height: 28
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default ActionButton;
