import ContextMenu from './menu'
import Modal from './modal';
import './styles.css'
import { BackgroundModule } from './modules/background.module'
import {NyanCatModule} from "@/modules/nyan-cat.module";

const contextMenu = new ContextMenu();
// contextMenu.add(new ClicksModule());
contextMenu.add(new BackgroundModule());
contextMenu.add(new NyanCatModule());