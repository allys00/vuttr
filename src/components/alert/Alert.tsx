import React from 'react';
import { Modal } from 'antd';

interface IProps {
    title: string,
    message: string,
    onOk(): void,
    onCancel(): void
};

const Alert = ({ onOk, onCancel, title, message }: IProps) => (
    <Modal
        title={title}
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
    >
        <p>{message}</p>
    </Modal>
);

export default Alert;