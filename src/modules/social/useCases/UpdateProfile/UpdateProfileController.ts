import { Controller } from "core/infra/Controller";
import { HttpResponse, forbidden, ok } from "core/infra/HttpResponse";
import { UpdateProfile } from "./UpdateProfile";

type UpdateProfileRequest = {
  user: { id: string };
  nickname?: string;
  slug?: string;
  bio?: string;
  link?: string;
  action: string;
};

export class UpdateProfileController implements Controller {
  constructor(private updateProfile: UpdateProfile) { }

  async handle(data: UpdateProfileRequest): Promise<HttpResponse> {
    const result = await this.updateProfile.execute(data);

    if (result.isLeft()) {
      const error = result.value;
      return forbidden(error);
    } else {
      return ok();
    }
  }
}
