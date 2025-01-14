import React, { FC } from "react";
import "./AddDatasource.scss";
import { Drawer, Menu } from "antd";

import { ConnectionCard } from "../../../components/Cards/DatasourceCard";
import ServiceConnectionBuilder from "./ServiceConnectionBuilder";
interface ConnectionMeta {
  name: string;
  connType: string;
  description: string;
}

const AddDatasource: FC<{ orgSlugId: string; workspaceId: number }> = ({ orgSlugId, workspaceId }) => {
  const [selectedKey, setSelectedKey] = React.useState("file-system");
  const [sourceDrawer, setSrouceDrawer] = React.useState<{ isOpen: boolean; name: string }>({
    isOpen: false,
    name: "",
  });
  const selectMenu = (e: any) => {
    setSelectedKey(e.key);
  };

  const onCloseDrawer = () => {
    setSrouceDrawer({ ...sourceDrawer, isOpen: false });
  };

  const openSourceDrawer = (name: string) => {
    setSrouceDrawer({ ...sourceDrawer, isOpen: true, name: name });
  };

  const connections: ConnectionMeta[] = [
    {
      name: "S3",
      connType: "fs",
      description: "Add the S3 bucket to browse, upload and preview objects.",
    },
    {
      name: "Postgres",
      connType: "db",
      description: "Add the S3 bucket to browse, upload and preview objects.",
    },
    {
      name: "MySQL",
      connType: "db",
      description: "Add the S3 bucket to browse, upload and preview objects.",
    },
    {
      name: "MariaDB",
      connType: "db",
      description: "Add the S3 bucket to browse, upload and preview objects.",
    },
    {
      name: "Kafka",
      connType: "messaging",
      description: "Add the S3 bucket to browse, upload and preview objects.",
    },
  ];

  return (
    <div className='add-datasource-wrapper'>
      <div className='header-title'>Add Datasource</div>
      <div className='data-source-menu'>
        <Menu onClick={selectMenu} selectedKeys={[selectedKey]} mode='horizontal'>
          <Menu.Item key='file-system'>
            <a className='file-system' href='#file-system'>
              File System
            </a>
          </Menu.Item>
          <Menu.Item key='databases'>
            <a className='databases' href='#databases'>
              Databases
            </a>
          </Menu.Item>
          <Menu.Item key='messaging-system'>
            <a className='messaging-system' href='#messaging-system'>
              Messaging System
            </a>
          </Menu.Item>
        </Menu>
      </div>
      <div className='data-source-list'>
        <div id='file-system' className='data-source-section'>
          <div className='tabs-title'>File System</div>
          <div className='sources-cards'>
            {connections
              .filter((c) => c.connType === "fs")
              .map((c, i) => (
                <ConnectionCard key={i} name={c.name} description={c.description} onClickAdd={openSourceDrawer} />
              ))}
          </div>
        </div>
        <div id='databases' className='data-source-section'>
          <div className='tabs-title'>Databases</div>
          <div className='sources-cards'>
            {connections
              .filter((c) => c.connType === "db")
              .map((c, i) => (
                <ConnectionCard key={i} name={c.name} description={c.description} onClickAdd={openSourceDrawer} />
              ))}
          </div>
        </div>
        <div id='messaging-system' className='data-source-section'>
          <div className='tabs-title'>Messaging System</div>
          <div className='sources-cards'>
            {connections
              .filter((c) => c.connType === "messaging")
              .map((c) => (
                <ConnectionCard key={c.name} name={c.name} description={c.description} onClickAdd={openSourceDrawer} />
              ))}
          </div>
        </div>
      </div>

      <ServiceConnectionBuilder
        orgSlugId={orgSlugId}
        workspaceId={workspaceId}
        service={sourceDrawer.name}
        isOpen={sourceDrawer.isOpen}
        onClose={onCloseDrawer}
      />
    </div>
  );
};

export default AddDatasource;
