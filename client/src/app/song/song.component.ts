import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserSongDto } from '../user-list/user-song-dto';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class SongComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  @Input()
  songDto: UserSongDto;

  ngOnInit(): void {}

  formatAndValidate(link: string): string {
    const regex = /https:\/\/open\.spotify\.com\/track\/[0-9A-Za-z]{22}/;
    const match = link.match(regex);

    if (match && match.length > 0) {
      return this.sanitizer.sanitize(
        SecurityContext.RESOURCE_URL,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          match[0].replace('/track', '/embed/track')
        )
      );
    }
    return null;
  }
}
