import ContextMenu from './menu'
import Modal from './modal';
import './styles.css'
import { BackgroundModule } from './modules/background.module'
import {RandomSoundModule} from "@/modules/sounds.module";
import  ShapeModule  from './modules/shape.module'

const contextMenu = new ContextMenu();
// contextMenu.add(new ClicksModule());
contextMenu.add(new BackgroundModule());
contextMenu.add(new RandomSoundModule());
contextMenu.add(new ShapeModule());
