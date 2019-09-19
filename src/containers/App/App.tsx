import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Button, Modal } from 'antd';
import Alert from '../../components/alert/Alert';
import { ITool } from '../../models/Tools.model';
import Axios from 'axios';
import { urlBase } from '../../utils/urls.constants';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Notification, { NOTIFICATION_TYPE } from '../../components/notification/Notification';
import ToolCard from './components/tool-card/ToolCard';

import './App.scss'
import CreateTool from './components/create-tool/CreateTool';

const { Search } = Input;

const App: React.FC = () => {
  const [tools, setTools] = useState<ITool[]>([]);
  const [toolToRemove, setToolToRemove] = useState<ITool | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchInTags, setSearchInTags] = useState<boolean>(false);
  const [openCreateTool, setOpenCreateTool] = useState<boolean>(false);


  useEffect(() => {
    async function getTools() {
      const { data } = await Axios.get(urlBase);
      setTools(data);
    };

    getTools();
  }, []);

  useEffect(() => {
    searchChange(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInTags]);

  async function onRemoveTool(tool: ITool) {
    try {
      await Axios.delete(`${urlBase}/${tool.id}`);
      const { data } = await Axios.get(urlBase);
      setTools(data)
      setToolToRemove(null);
    } catch (error) {
      Notification(NOTIFICATION_TYPE.ERROR, 'Error', error.message);
    }
  };

  const searchAPI = (text: string) => Axios.get(`${urlBase}?${searchInTags ? 'q' : 'tags_like'}=${text}`);

  const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 1000);

  async function searchChange(text: string) {
    const { data } = await searchAPIDebounced(text);
    setTools(data);
    setSearchValue(text);
  }

  async function addNewTool(tool: ITool) {
    tool.tags = (tool.tags as any).split(' ');
    const { data } = await Axios.post(urlBase, tool);
    setTools([...tools, data]);
    setOpenCreateTool(false);
  }

  return (
    <main className="app-container">
      <h1>VUTTR</h1>
      <h2>Very Userful Tools to Remember</h2>

      <section className="header-actions">
        <Search
          placeholder="Search"
          onChange={({ target }) => searchChange(target.value)}
          style={{ width: 300 }}
        />

        <Checkbox
          checked={searchInTags}
          className="checkbox-search-tags"
          onChange={() => setSearchInTags(!searchInTags)}>
          Search in tags only
          </Checkbox>

        <Button icon="plus" onClick={() => setOpenCreateTool(true)}> ADD </Button>
      </section>


      <ul className="tools-list">
        {tools.map((tool: ITool) => (
          <li key={tool.id}>
            <ToolCard
              searchInTags={searchInTags}
              highlightWord={searchValue}
              tool={tool}
              onRemove={setToolToRemove} />
          </li>
        ))}
      </ul>

      {
        toolToRemove &&
        <Alert
          title="Remove Tool"
          message={`Are you sure you want to remove ${(toolToRemove as ITool).title} ?`}
          onOk={() => onRemoveTool(toolToRemove)}
          onCancel={() => setToolToRemove(null)} />
      }

      <Modal
        title="Create Tool"
        visible={openCreateTool}
        okText="Add Tool"
        footer={null}
        onCancel={() => setOpenCreateTool(false)}
      >
        <CreateTool
          addNewTool={addNewTool}
        />
      </Modal>

    </main>
  );
}

export default App;
