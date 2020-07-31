import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implamentations/DiskStorageProvide';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
