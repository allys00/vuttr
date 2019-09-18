import React from 'react';
import { ITool } from '../../../../models/Tools.model';
import Highlighter from 'react-highlight-words';
import { Button } from 'antd';
import './ToolCard.scss';

interface IToolCard {
    tool: ITool,
    onRemove(tool: ITool): void,
    highlightWord: string,
    searchInTags: boolean,
}

const ToolCard = ({ tool, onRemove, highlightWord, searchInTags }: IToolCard) => (
    <div key={tool.id} className="tool-card">

        <h3 className="tool-title">
            <Highlighter
                searchWords={[searchInTags ? '' : highlightWord]}
                autoEscape={true}
                textToHighlight={tool.title} />
        </h3>

        <p>
            <Highlighter
                searchWords={[searchInTags ? '' : highlightWord]}
                autoEscape={true}
                textToHighlight={tool.description} />
        </p>

        <Highlighter
            className="tags-highlight"
            searchWords={[highlightWord]}
            autoEscape={true}
            textToHighlight={tool.tags.map(tag => `#${tag}`).join(' ')} />

        <Button
            onClick={() => onRemove(tool)}
            className="remove-button"
            type="link"
            icon="close">Remove</Button>
    </div>
);

export default ToolCard;