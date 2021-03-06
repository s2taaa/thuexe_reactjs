import React, {useState} from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
    Form,
    Input, Modal
} from 'antd';
import PropTypes from 'prop-types';

ModalChangePassword.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
};

ModalChangePassword.defaultProps = {
    onCancel: null,
    onSaveCodeRevoke: null
};
export default function ModalChangePassword({ onCancel, visible }) {
    const [form] = Form.useForm();
    const { confirm } = Modal;

    const handleOk = async()=>{

    }
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
  return (
    <Modal
            title="Đổi mật khẩu"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Thay đổi'
            cancelText='Hủy'

        >
            <Form
                {...formItemLayout}
                form={form}
                name="changepassword"
                initialValues={{
                    oldpassword: '',
                    password: '',
                    confirm: ''
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="oldpassword"
                    label="Mật khẩu hiện tại"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu cũ !',
                        },

                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value && value.trim().length < 8) {
                                    return Promise.reject(new Error('Mật khẩu phải có ít nhất 8 kí tự'));

                                }
                                if (value && getFieldValue('oldpassword').trim() === value) {
                                    return Promise.reject(new Error('Mật khẩu mới không trùng với mật khẩu cũ'));

                                }
                                return Promise.resolve();

                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Nhập lại mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập lại mật khẩu',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('2 mật khẩu nhập không khớp với nhau'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
}


