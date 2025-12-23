'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { rateItem } from '@/app/actions/rate';
import { useTranslations } from 'next-intl';

interface RatingProps {
  itemId: string;
  itemType: 'plugin' | 'theme';
  initialAverage: number;
  initialTotal: number;
}

export function Rating({ itemId, itemType, initialAverage, initialTotal }: RatingProps) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(initialAverage);
  const [total, setTotal] = useState(initialTotal);
  const [isRating, setIsRating] = useState(false);
  const t = useTranslations('Rating');

  const handleRate = async (value: number) => {
    if (isRating) return;
    console.log(`[Rating] Iniciando avaliação de ${itemType}: ${itemId} com valor ${value}`);
    setIsRating(true);

    const result = await rateItem(itemId, itemType, value);

    if (result.success) {
      console.log(`[Rating] Avaliação salva com sucesso para ${itemId}`);
      // Optimistic update
      const newTotal = total + 1;
      const newAverage = (rating * total + value) / newTotal;
      setRating(newAverage);
      setTotal(newTotal);
    } else {
      console.error(`[Rating] Erro ao salvar avaliação:`, result.error);
    }

    setIsRating(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`transition-all duration-200 ${isRating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'}`}
            onMouseEnter={() => !isRating && setHover(star)}
            onMouseLeave={() => !isRating && setHover(0)}
            onClick={() => handleRate(star)}
            disabled={isRating}
          >
            <Star
              size={16}
              className={`${(hover || Math.round(rating)) >= star
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground/30'
                } transition-colors`}
            />
          </button>
        ))}
        <span className="ml-2 text-xs font-medium text-muted-foreground">
          {rating > 0 ? rating.toFixed(1) : t('noRating')}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground/60">
        {total} {total === 1 ? t('vote') : t('votes')}
      </span>
    </div>
  );
}
