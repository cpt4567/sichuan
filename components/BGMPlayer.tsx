'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * BGM 플레이어 - "난 천안문을 사랑해"
 * public/bgm.mp3 파일을 사용합니다.
 * 저작권이 있는 곡이므로, 사용자가 직접 MP3 파일을 public/bgm.mp3 경로에 넣어주세요.
 */
export function BGMPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/bgm.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = muted ? 0 : 0.5;
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => { /* 파일이 없으면 무시 - public/bgm.mp3 추가 필요 */ });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !muted;
    audio.volume = nextMuted ? 0 : 0.5;
    setMuted(nextMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={togglePlay}
        className="vintage-btn px-4 py-2 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-red-950 rounded transition flex items-center gap-2"
        title={playing ? '일시정지' : '재생'}
      >
        {playing ? (
          <span className="text-lg">⏸</span>
        ) : (
          <span className="text-lg">▶</span>
        )}
        <span className="text-sm font-bold">BGM</span>
      </button>
      <button
        type="button"
        onClick={toggleMute}
        className="vintage-btn px-3 py-2 border-2 border-amber-400/70 text-amber-400/90 hover:bg-amber-400/20 rounded transition"
        title={muted ? '음소거 해제' : '음소거'}
      >
        <span className="text-lg">{muted ? '🔇' : '🔊'}</span>
      </button>
    </div>
  );
}
