import React from 'react';
import { ITool } from '../../../../models/Tools.model';
import { Button } from 'antd';
import Highlighter from "react-highlight-words";

import './ToolsList.scss';

interface IProps {
    tools: ITool[],
};

const ToolsList = ({ tools }: IProps) => {
    return (
        <ul className="tools-list">
            {tools.map((tool: ITool) => (
                <li key={tool.id}>
                    <ToolCard {...tool} />
                </li>
            ))}
        </ul>
    )
};

const ToolCard = ({ id, title, description, tags }: ITool) => (
    <div key={id} className="tool-card">
        <Button
            className="tool-title"
            type="link">{title} </Button>

        <p>{description}</p>

        <Highlighter
            className="tags-highlight"
            searchWords={["node"]}
            autoEscape={true}
            textToHighlight={tags.map(tag => `#${tag}`).join(' ')} />

        <Button
            className="remove-button"
            type="link"
            icon="close">Remove</Button>
    </div>
);

export default ToolsList;