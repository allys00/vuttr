import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './CreateTool.scss';
import { ITool } from '../../../../models/Tools.model';
import { CheckIfHasEmpty } from '../../../../utils/utils.functions';

interface IProps {
    addNewTool(tool: ITool): void
};

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const CreateTool = ({ addNewTool }: IProps) => {

    const [formValue, setFormValue] = useState<Partial<ITool>>({});

    function onChangeForm({ target }: InputChange) {
        setFormValue({ ...formValue, [target.id]: target.value });
    };

    return (
        <Form className="create-tool-form">
            <div className="input-control">
                <label htmlFor="title">Tool Name</label>
                <Input
                    value={formValue.title}
                    onChange={onChangeForm}
                    id="title" />
            </div>

            <div className="input-control">
                <label htmlFor="link">Tool Link</label>
                <Input
                    value={formValue.link}
                    onChange={onChangeForm}
                    id="link" />
            </div>
            <div className="input-control">
                <label htmlFor="description">Tool Description</label>
                <TextArea
                    value={formValue.description}

                    onChange={onChangeForm}
                    id="description"
                    autosize={{ minRows: 2, maxRows: 4 }}
                />
            </div>

            <div className="input-control">
                <label htmlFor="tags">Tags</label>
                <Input
                    placeholder="Separate tags by space"
                    value={formValue.tags}
                    onChange={onChangeForm}
                    id="tags" />
            </div>

            <Button
                disabled={CheckIfHasEmpty(formValue, ['title', 'tags', 'description', 'link'])}
                type="primary"
                className="btn-add-tool"
                onClick={() => {
                    addNewTool(formValue as ITool);
                    setFormValue({});
                }}>Add tool</Button>
        </Form>
    );
};

export default CreateTool;