'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import { ofetch } from 'ofetch';

interface Space {
  id: number;
  name: string;
}

export function SpaceSwitcher({ currentSpaceId }: { currentSpaceId: string }) {
  const [open, setOpen] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null);
  const router = useRouter();

  useEffect(() => {
    ofetch<Space[]>('/api/spaces')
      .then((data) => {
        setSpaces(data || []);
        const current = data?.find(
          (space: Space) => space.id === Number(currentSpaceId)
        );
        if (current) setCurrentSpace(current);
      })
      .catch((error) => {
        console.error('获取空间时出错:', error);
        setSpaces([]);
      })
      .finally(() => {
      });
  }, [currentSpaceId]);

  const handleSpaceSelect = async (spaceId: number) => {
    setOpen(false);
    try {
      await router.push(`/space/${spaceId}`);
    } catch (error) {
      console.error('导航时出错:', error);
      // 可以在这里添加错误处理,比如显示一个错误提示
    }
  };

  if (!currentSpace) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentSpace.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜索空间..." />
          <CommandList>
            <CommandEmpty>没有找到空间。</CommandEmpty>
            <CommandGroup heading="空间">
              {spaces.length > 0 ? (
                spaces.map((space) => (
                  <CommandItem
                    key={space.id}
                    onSelect={() => handleSpaceSelect(space.id)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        currentSpace.id === space.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {space.name}
                  </CommandItem>
                ))
              ) : (
                <CommandItem>没有空间可用</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
