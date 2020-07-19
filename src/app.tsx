import './stylesheets/app.css';

import React from 'react';
import { SandwichDropzoneComponent, DropzoneFile } from './components/sandwich-dropzone-component';
import { SandwichSortableListComponent, arrayMove } from './components/sandwich-sortable-list-component';
import { createPDF } from './lib/pdf-helpers';

interface AppProps {}

interface AppState {
  files: DropzoneFile[]
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      files: []
    };
  }

  onSortEnd = (sort: { oldIndex: number, newIndex: number }): void => {
    this.setState({
      files: arrayMove(this.state.files, sort.oldIndex, sort.newIndex)
    });
  };

  onButtonClick = (): void => {
    createPDF(this.state.files);
  };

  render(): React.ReactElement {
    const that = this;
    const eventHandlers = {
      addedfile(file: DropzoneFile) {
        that.setState({ files: this.files });
      }
    };

    return (
      <div>
        <h1>Sandwich Beta</h1>
        <SandwichDropzoneComponent eventHandlers={eventHandlers} />
        <SandwichSortableListComponent items={this.state.files} onSortEnd={this.onSortEnd} />
        <button onClick={this.onButtonClick}>Sandwich PDF</button>
      </div>
    );
  }
}

export default App;
