import { BackgroundController } from '../controllers/background.js';

const backgroundController = new BackgroundController();

backgroundController.run().catch(e => console.error(e));
