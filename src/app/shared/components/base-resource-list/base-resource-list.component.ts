import { OnInit, Directive } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import swal from 'sweetalert2';
import { Page } from '../../models/page.model';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit
{
  resources: T[] = [];
  size: number = 2;
  wordSearch: string = '';
  page: Page = {} as Page;
  pageNumber = 0;
  totalElementos = 0;

  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit() {
    this.resourceService
      .getAllPage(this.pageNumber, this.size, this.wordSearch)
      .subscribe(
        (response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        },
        (error) => alert('Erro ao carregar a lista')
      );
  }

  async deleteResource(resource: T) {
    const confirmacao = await swal.fire({
      title: 'Delete',
      text: 'Do you want really delete the item??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });

    if (confirmacao?.isConfirmed) {
      this.resourceService.delete(resource?.id || 0).subscribe(
        () =>
          (this.resources = this.resources.filter(
            (element) => element?.id != resource?.id
          )),
        () => swal.fire('Erro', 'Error the try delete!', 'error')
      );
    }
  }
}
