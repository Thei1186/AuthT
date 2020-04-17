import {IMock, Times} from 'moq.ts';
import {UserRepository} from '../../src/users/user.repository';
import {UserFunctionsService} from '../../src/users/user.functions.service';
import {DataHelper} from '../helpers/data.helper';
import {RepositoryHelper} from '../helpers/repository.helper';




describe('UserService', () => {
  let helper: DataHelper;
  let repoHelper: RepositoryHelper;
  let userRepository: IMock<UserRepository>;
  let userFunctionsService: UserFunctionsService;

  beforeEach(() => {
    helper = new DataHelper();
    repoHelper = new RepositoryHelper(helper);
    userRepository = repoHelper.getUserRepositoryMock();
    userFunctionsService = new UserFunctionsService(userRepository.object());
  });

  it('Init test', async () => {
    await userFunctionsService.deleteUser(helper.user1.uid);
    userRepository.verify(ur => ur.deleteUser(helper.user1.uid), Times.Exactly(1));
  })

});
