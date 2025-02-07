import ContextMenu from './menu'
import Modal from './modal';
import './styles.css'
import { BackgroundModule } from './modules/background.module'
import { MessageModule } from "@/modules/message.module";

const contextMenu = new ContextMenu();
// contextMenu.add(new ClicksModule());
contextMenu.add(new BackgroundModule());
contextMenu.add(new MessageModule());