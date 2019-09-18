import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Button } from 'antd';
import ToolsList from './components/tools-list/ToolsList';
import { ITool } from '../../models/Tools.model';
import Axios from 'axios';

import './App.scss'
import { urlBase } from '../../utils/urls.constants';

const { Search } = Input;

const App: React.FC = () => {
  const [tools, setTools] = useState<ITool[]>([]);

  useEffect(() => {
    async function getTools() {
      const { data } = await Axios.get(urlBase);
      setTools(data);
    };

    getTools();
  }, [])

  return (
    <main className="app-container">
      <h1>VUTTR</h1>
      <h2>Very Userful Tools to Remember</h2>

      <section className="header-actions">
        <Search
          placeholder="Search"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />

        <Checkbox
          className="checkbox-search-tags"
          onChange={console.log}>Search in tags only</Checkbox>

        <Button icon="plus"> ADD </Button>
      </section>

      <ToolsList tools={tools} />

    </main>
  );
}

export default App;
