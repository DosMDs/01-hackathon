import ContextMenu from './menu'
import './styles.css'
import {BackgroundModule} from './modules/background.module'

const contextMenu = new ContextMenu();
// contextMenu.add(new ClicksModule());
contextMenu.add(new BackgroundModule());