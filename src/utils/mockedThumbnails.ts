export function getThumbnail(type: string) {
  let mockedThumbnails: string[] = [];
  switch (type) {
    case 'camera':
      mockedThumbnails = [
        '/mock/preview_cam_1.png',
        '/mock/preview_cam_2.png',
        '/mock/preview_cam_3.png',
        '/mock/preview_cam_4.png',
        '/mock/preview_cam_5.png'
      ];
      break;

    case 'microphone':
      mockedThumbnails = ['/mock/microphone-2.png'];
      break;

    case 'graphics':
      mockedThumbnails = ['/mock/align-box-bottom-center.png'];
      break;
  }
  return mockedThumbnails[
    mockedThumbnails.length > 1
      ? Math.floor(Math.random() * mockedThumbnails.length)
      : 0
  ];
}
