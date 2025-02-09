import "./styles.css";
import ContextMenu from "./menu";
import BackgroundModule from "./modules/background.module";
import TimerModule from "./modules/timer.module";
import {RandomSoundModule} from "./modules/sounds.module";
import ShapeModule from "./modules/shape.module";
import ClicksModule from "./modules/clicks.module";
import MessageModule from "./modules/message.module";
import {DioramsModule} from "@/modules/diorams.module";
import ResetModule from "./modules/reset.module";

const contextMenu = new ContextMenu();
contextMenu.add(new BackgroundModule());
contextMenu.add(new RandomSoundModule());
contextMenu.add(new ShapeModule());
contextMenu.add(new TimerModule());
contextMenu.add(new ClicksModule());
contextMenu.add(new MessageModule());
contextMenu.add(new DioramsModule());

contextMenu.add(new ResetModule(contextMenu));
