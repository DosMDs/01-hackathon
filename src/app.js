import ContextMenu from './menu'
import Modal from './modal';
import './styles.css'

const contextMenu = new ContextMenu();
// contextMenu.add(new ClicksModule());
const modal = new Modal();
modal.open('Test', 'Text test');