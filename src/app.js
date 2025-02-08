import ContextMenu from './menu'
import './styles.css'
import { BackgroundModule } from './modules/background.module'
import  ShapeModule  from './modules/shape.module'
import { showInputModal } from './utils';

const contextMenu = new ContextMenu();
// contextMenu.add(new ClicksModule());
contextMenu.add(new BackgroundModule());
contextMenu.add(new ShapeModule());

showInputModal('hello','',((input) => console.log('input')));