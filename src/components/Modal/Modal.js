import React, { Component } from 'react';
import css from './Modal.module.css'

export default class Modal extends Component {
    render() {
        return (
            <div className={css.Overlay}  onClick={(e) => {this.props.closeModal(e)} } name="overlay" >
                <div className={css.Modal}>
                    <img src={this.props.image} alt="" />
                </div>
            </div>
        );
    }
}
